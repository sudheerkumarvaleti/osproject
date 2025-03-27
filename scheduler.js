class Process {
    constructor(pid, name, priority, burstTime, arrivalTime) {
        this.pid = pid;
        this.name = name;
        this.priority = priority;
        this.burstTime = burstTime;
        this.arrivalTime = arrivalTime;
        this.remainingTime = burstTime;
        this.energyConsumption = 0;
        this.isRunning = false;
        this.progress = 0;
    }
}

class Scheduler {
    constructor() {
        this.processes = [];
        this.currentTime = 0;
        this.totalEnergyConsumption = 0;
        this.isRunning = false;
        this.timeQuantum = 2;
        this.pidCounter = 1;
    }

    addProcess(name, priority, burstTime, arrivalTime) {
        const process = new Process(this.pidCounter++, name, priority, burstTime, arrivalTime);
        this.processes.push(process);
        this.updateProcessList();
    }

    updateProcessList() {
        const tbody = document.getElementById('processList');
        tbody.innerHTML = '';

        this.processes.forEach(process => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${process.pid}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${process.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${['High', 'Normal', 'Low'][process.priority - 1]}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${process.burstTime}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${process.arrivalTime}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${process.progress}%"></div>
                    </div>
                    <span class="text-xs mt-1">${process.progress}%</span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updateGanttChart() {
        const ganttChart = document.getElementById('ganttChart');
        ganttChart.innerHTML = '';

        this.processes.forEach(process => {
            const processBar = document.createElement('div');
            processBar.className = 'flex items-center mb-2';
            
            const label = document.createElement('div');
            label.className = 'w-24 text-sm text-gray-600';
            label.textContent = process.name;

            const progressBar = document.createElement('div');
            progressBar.className = 'flex-1 ml-4';
            
            const barContainer = document.createElement('div');
            barContainer.className = 'w-full bg-gray-200 rounded-full h-4';
            
            const bar = document.createElement('div');
            bar.className = `bg-blue-600 h-4 rounded-full transition-all duration-500`;
            bar.style.width = `${process.progress}%`;
            
            if (process.isRunning) {
                bar.classList.add('animate-pulse');
            }

            barContainer.appendChild(bar);
            progressBar.appendChild(barContainer);
            processBar.appendChild(label);
            processBar.appendChild(progressBar);
            ganttChart.appendChild(processBar);
        });
    }

    updateStatistics() {
        document.getElementById('energyConsumption').textContent = 
            `${this.totalEnergyConsumption.toFixed(2)} units`;
        
        const efficiency = this.calculateEnergyEfficiency();
        document.getElementById('efficiencyBar').style.width = `${efficiency}%`;
        document.getElementById('efficiencyText').textContent = `${efficiency.toFixed(1)}%`;
    }

    calculateEnergyEfficiency() {
        if (this.totalEnergyConsumption === 0) return 100;
        const maxPossibleEnergy = this.processes.length * 10 * this.currentTime;
        const actualSavings = (maxPossibleEnergy - this.totalEnergyConsumption) / maxPossibleEnergy;
        return Math.min(100, (actualSavings / 0.3) * 100);
    }

    async run() {
        if (this.processes.length === 0) {
            alert('Please add processes first!');
            return;
        }

        this.isRunning = true;
        document.getElementById('startButton').disabled = true;
        document.getElementById('processForm').disabled = true;

        while (this.isRunning && this.processes.some(p => p.remainingTime > 0)) {
            for (const process of this.processes) {
                if (process.remainingTime > 0 && process.arrivalTime <= this.currentTime) {
                    process.isRunning = true;
                    const executionTime = Math.min(this.timeQuantum, process.remainingTime);
                    process.remainingTime -= executionTime;
                    
                    // Calculate energy consumption
                    const energyFactor = [1.5, 1.0, 0.7][process.priority - 1];
                    process.energyConsumption += executionTime * energyFactor;
                    this.totalEnergyConsumption += executionTime * energyFactor;
                    
                    // Update progress
                    process.progress = ((process.burstTime - process.remainingTime) / process.burstTime * 100);
                    
                    this.updateProcessList();
                    this.updateGanttChart();
                    this.updateStatistics();
                    
                    await new Promise(resolve => setTimeout(resolve, 500));
                    process.isRunning = false;
                }
            }
            this.currentTime++;
        }

        this.isRunning = false;
        document.getElementById('startButton').disabled = false;
        document.getElementById('processForm').disabled = false;
    }

    reset() {
        this.processes = [];
        this.currentTime = 0;
        this.totalEnergyConsumption = 0;
        this.isRunning = false;
        this.pidCounter = 1;
        this.updateProcessList();
        this.updateGanttChart();
        this.updateStatistics();
    }
}

// Initialize scheduler
const scheduler = new Scheduler();

// Event listeners
document.getElementById('processForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('processName').value;
    const priority = parseInt(document.getElementById('priority').value);
    const burstTime = parseInt(document.getElementById('burstTime').value);
    const arrivalTime = parseInt(document.getElementById('arrivalTime').value);

    scheduler.addProcess(name, priority, burstTime, arrivalTime);
    e.target.reset();
});

document.getElementById('startButton').addEventListener('click', () => {
    scheduler.run();
});

document.getElementById('resetButton').addEventListener('click', () => {
    scheduler.reset();
}); 