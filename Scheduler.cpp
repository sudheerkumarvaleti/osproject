#include "Scheduler.h"
#include <iostream>
#include <iomanip>
#include <algorithm>
#include <chrono>
#include <thread>

Scheduler::Scheduler(int quantum) : timeQuantum(quantum), currentTime(0), totalEnergyConsumption(0.0) {}

void Scheduler::addProcess(std::shared_ptr<Process> process) {
    processes.push_back(process);
}

void Scheduler::updateReadyQueue() {
    for (const auto& process : processes) {
        if (!process->isCompleted() && process->getArrivalTime() <= currentTime && !process->getIsRunning()) {
            readyQueue.push(process);
        }
    }
}

double Scheduler::calculateEnergyEfficiency() const {
    if (totalEnergyConsumption == 0) return 100.0;
    
    double maxPossibleEnergy = processes.size() * BASE_POWER_CONSUMPTION * currentTime;
    double actualSavings = (maxPossibleEnergy - totalEnergyConsumption) / maxPossibleEnergy;
    return std::min(100.0, (actualSavings / MAX_POWER_SAVING) * 100.0);
}

void Scheduler::run() {
    while (true) {
        updateReadyQueue();
        
        if (readyQueue.empty()) {
            bool allCompleted = true;
            for (const auto& process : processes) {
                if (!process->isCompleted()) {
                    allCompleted = false;
                    break;
                }
            }
            if (allCompleted) break;
            currentTime++;
            continue;
        }

        auto currentProcess = readyQueue.front();
        readyQueue.pop();

        std::cout << "\033[2J\033[1;1H"; // Clear screen
        displayProcessStatus();
        displayGanttChart();
        
        currentProcess->executeProcess(timeQuantum);
        totalEnergyConsumption += currentProcess->getEnergyConsumption();
        
        currentTime++;
        std::this_thread::sleep_for(std::chrono::milliseconds(500)); // Slow down for visualization
    }
    
    displayStatistics();
}

void Scheduler::displayGanttChart() const {
    std::cout << "\nGantt Chart:\n";
    std::cout << std::string(50, '-') << "\n";
    
    for (const auto& process : processes) {
        std::cout << "|" << std::setw(3) << process->getPID() << " ";
        int progress = (process->getBurstTime() - process->getRemainingTime()) * 10 / process->getBurstTime();
        std::cout << "[" << std::string(progress, '#') << std::string(10 - progress, '-') << "] ";
        std::cout << std::setw(3) << (process->getBurstTime() - process->getRemainingTime()) * 100 / process->getBurstTime() << "%";
        if (process->getIsRunning()) std::cout << " *";
        std::cout << "\n";
    }
    
    std::cout << std::string(50, '-') << "\n";
}

void Scheduler::displayProcessStatus() const {
    std::cout << "\nProcess Status:\n";
    std::cout << std::setw(5) << "PID" << std::setw(15) << "Name" 
              << std::setw(10) << "Priority" << std::setw(15) << "Remaining" 
              << std::setw(15) << "Energy" << "\n";
    std::cout << std::string(60, '-') << "\n";
    
    for (const auto& process : processes) {
        std::cout << std::setw(5) << process->getPID()
                  << std::setw(15) << process->getName()
                  << std::setw(10) << process->getPriority()
                  << std::setw(15) << process->getRemainingTime()
                  << std::setw(15) << std::fixed << std::setprecision(2) 
                  << process->getEnergyConsumption() << "\n";
    }
}

void Scheduler::displayStatistics() const {
    std::cout << "\nFinal Statistics:\n";
    std::cout << std::string(50, '-') << "\n";
    std::cout << "Total Time: " << currentTime << " units\n";
    std::cout << "Total Energy Consumption: " << std::fixed << std::setprecision(2) 
              << totalEnergyConsumption << " units\n";
    std::cout << "Energy Efficiency: " << calculateEnergyEfficiency() << "%\n";
    std::cout << std::string(50, '-') << "\n";
} 