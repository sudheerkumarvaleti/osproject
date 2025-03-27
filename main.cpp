#include <iostream>
#include <memory>
#include "Scheduler.h"

using namespace std;

void displayMenu() {
    cout << "\nEnergy-Efficient CPU Scheduler\n";
    cout << "==============================\n";
    cout << "1. Add Process\n";
    cout << "2. Start Scheduling\n";
    cout << "3. Exit\n";
    cout << "Choice: ";
}

int main() {
    Scheduler scheduler(2); // Time quantum = 2
    int choice;
    int pidCounter = 1;

    while (true) {
        displayMenu();
        cin >> choice;

        if (choice == 1) {
            string name;
            int priority, burst, arrival;

            cout << "\nEnter process details:\n";
            cout << "Name: ";
            cin >> name;
            
            cout << "Priority (1=High, 2=Normal, 3=Low): ";
            cin >> priority;
            while (priority < 1 || priority > 3) {
                cout << "Invalid priority. Please enter 1, 2, or 3: ";
                cin >> priority;
            }

            cout << "Burst Time: ";
            cin >> burst;
            
            cout << "Arrival Time: ";
            cin >> arrival;

            auto process = make_shared<Process>(pidCounter++, name, priority, burst, arrival);
            scheduler.addProcess(process);
            cout << "\nProcess added successfully!\n";
        }
        else if (choice == 2) {
            if (scheduler.getProcessCount() == 0) {
                cout << "\nNo processes to schedule. Please add processes first.\n";
                continue;
            }
            cout << "\nStarting CPU Scheduling...\n";
            scheduler.run();
            break;
        }
        else if (choice == 3) {
            cout << "\nExiting...\n";
            break;
        }
        else {
            cout << "\nInvalid choice. Please try again.\n";
        }
    }

    return 0;
} 