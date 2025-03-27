#ifndef PROCESS_H
#define PROCESS_H

#include <string>

class Process {
private:
    int pid;
    std::string name;
    int priority;
    int burstTime;
    int arrivalTime;
    int remainingTime;
    double energyConsumption;
    bool isRunning;

public:
    Process(int pid, std::string name, int priority, int burst, int arrival);
    
    // Getters
    int getPID() const { return pid; }
    std::string getName() const { return name; }
    int getPriority() const { return priority; }
    int getBurstTime() const { return burstTime; }
    int getArrivalTime() const { return arrivalTime; }
    int getRemainingTime() const { return remainingTime; }
    double getEnergyConsumption() const { return energyConsumption; }
    bool getIsRunning() const { return isRunning; }
    
    // Setters
    void setRemainingTime(int time) { remainingTime = time; }
    void setEnergyConsumption(double energy) { energyConsumption = energy; }
    void setIsRunning(bool running) { isRunning = running; }
    
    // Process execution
    void executeProcess(int timeQuantum);
    bool isCompleted() const { return remainingTime <= 0; }
};

#endif 