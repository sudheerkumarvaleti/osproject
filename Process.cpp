#include "Process.h"

Process::Process(int pid, std::string name, int priority, int burst, int arrival) 
    : pid(pid), name(name), priority(priority), burstTime(burst), arrivalTime(arrival) {
    remainingTime = burst;
    energyConsumption = 0.0;
    isRunning = false;
}

void Process::executeProcess(int timeQuantum) {
    if (remainingTime > 0) {
        int executionTime = std::min(timeQuantum, remainingTime);
        remainingTime -= executionTime;
        
        // Calculate energy consumption based on priority and execution time
        // Higher priority processes consume more energy
        double energyFactor = 1.0;
        switch(priority) {
            case 1: energyFactor = 1.5; break;  // High priority
            case 2: energyFactor = 1.0; break;  // Normal priority
            case 3: energyFactor = 0.7; break;  // Low priority
        }
        
        energyConsumption += executionTime * energyFactor;
        isRunning = true;
    } else {
        isRunning = false;
    }
} 