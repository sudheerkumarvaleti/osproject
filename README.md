🌟 Energy-Efficient CPU Scheduler

An interactive CPU Scheduling Simulator designed to analyze process execution, visualize scheduling in real time, and measure energy consumption with efficiency metrics.
This project includes two implementations:

A C++ CLI version for core scheduling logic

A Web-based UI (HTML + Tailwind + JS) for visualization, Gantt chart animation, and user interaction

🚀 Project Objective

To design and implement an intelligent CPU scheduler that reduces overall energy consumption while maintaining process performance.
The scheduler uses:

Time-Quantum Round Robin Logic

Priority-based energy factor calculation

Real-time visualization of process execution and efficiency

🧠 Key Features
🔹 1. Web-Based Scheduler Dashboard

Add processes dynamically

Visual Gantt chart animation

Live progress bars

Real-time energy consumption & efficiency display

Login & Registration system (LocalStorage-based authentication)

🔹 2. C++ Backend Logic (CLI Version)

Priority-aware energy model

Accurate process simulation

Color-coded process status

Detailed final statistics (energy, time, efficiency)

🔹 3. Energy Analytics

Energy consumption per process

Efficiency graph

CPU usage patterns

Power-saving calculation model

🛠️ Tech Stack Used
Frontend

HTML5

Tailwind CSS

JavaScript (Vanilla JS)

Real-time DOM rendering

Chart.js (for graphs in additional dashboard)

Backend Logic (Core Scheduling)

C++

OOP (Classes: Scheduler, Process)

STL Containers (vector, queue)

Utilities

LocalStorage / SessionStorage Authentication

Async JS Execution (Promises, await)

Gantt Chart Simulation

CLI UI (C++)

📊 Scheduling Algorithm

Round Robin with time quantum = 2 units

Priority levels: High, Normal, Low

Energy factor based on priority:

High → 1.5× consumption

Normal → 1.0×

Low → 0.7×

📉 Energy Efficiency Formula
efficiency = (actualSavings / maxPowerSaving) × 100


Where:

maxPossibleEnergy = totalProcesses × basePower × time

maxPowerSaving = 30% limit

▶️ How to Run the Project
1️⃣ Run C++ Version
g++ main.cpp Scheduler.cpp Process.cpp -o scheduler
./scheduler

2️⃣ Run Web Version

Just open index.html in any browser
(or run with VS Code Live Server).

📁 Project Structure
/project
 ├── index.html
 ├── login.html
 ├── scheduler.js
 ├── login.js
 ├── main.cpp
 ├── Process.cpp / Process.h
 ├── Scheduler.cpp / Scheduler.h
