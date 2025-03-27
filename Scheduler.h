#ifndef SCHEDULER_H
#define SCHEDULER_H

#include <vector>
#include <queue>
#include <memory>
#include "Process.h"

class Scheduler {
private:
    std::vector<std::shared_ptr<Process>> processes;
    std::queue<std::shared_ptr<Process>> readyQueue;
    int timeQuantum;
    int currentTime;
    double totalEnergyConsumption;
    
    // Energy efficiency parameters
    const double BASE_POWER_CONSUMPTION = 10.0;
    const double MAX_POWER_SAVING = 0.3;

    void updateReadyQueue();
    double calculateEnergyEfficiency() const;

public:
    Scheduler(int quantum = 2);
    
    void addProcess(std::shared_ptr<Process> process);
    void run();
    void displayGanttChart() const;
    void displayStatistics() const;
    void displayProcessStatus() const;
    
    // Getters
    int getCurrentTime() const { return currentTime; }
    double getTotalEnergyConsumption() const { return totalEnergyConsumption; }
    int getProcessCount() const { return processes.size(); }
};

#endif 