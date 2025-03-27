// Mobile menu functionality
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Mock data for processes with execution time and start time
const mockProcesses = [
    { pid: 1001, name: 'System', status: 'Running', cpu: '2%', priority: 'High', startTime: 0, duration: 8 },
    { pid: 1002, name: 'Browser', status: 'Running', cpu: '15%', priority: 'Normal', startTime: 2, duration: 4 },
    { pid: 1003, name: 'IDE', status: 'Running', cpu: '25%', priority: 'High', startTime: 4, duration: 6 },
    { pid: 1004, name: 'Terminal', status: 'Sleeping', cpu: '0%', priority: 'Normal', startTime: 6, duration: 3 },
    { pid: 1005, name: 'File Manager', status: 'Running', cpu: '1%', priority: 'Low', startTime: 8, duration: 4 },
];

// Populate process list
function populateProcessList() {
    const processList = document.getElementById('process-list');
    processList.innerHTML = mockProcesses.map(process => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${process.pid}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${process.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${process.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    ${process.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${process.cpu}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${process.priority}</td>
        </tr>
    `).join('');
}

// Update CPU usage with energy-efficient scheduling
function updateCPUUsage() {
    const usage = Math.floor(Math.random() * 60) + 20; // Keep CPU usage between 20-80%
    document.getElementById('cpu-usage-bar').style.width = `${usage}%`;
    document.getElementById('cpu-usage-text').textContent = `${usage}%`;
    return usage;
}

// Update energy efficiency based on CPU usage
function updateEnergyEfficiency(cpuUsage) {
    const baseEfficiency = 95;
    const efficiency = Math.max(70, baseEfficiency - (cpuUsage > 60 ? (cpuUsage - 60) : 0));
    document.getElementById('energy-efficiency').textContent = `${efficiency}%`;
    return efficiency;
}

// Initialize charts
const timeLabels = Array.from({length: 10}, (_, i) => `${i}m ago`).reverse();
const initialEnergyData = [95, 92, 88, 85, 82, 80, 78, 75, 73, 70];
const initialPerformanceData = [65, 68, 72, 75, 78, 80, 82, 85, 87, 90];

// Gantt Chart Data Preparation
function prepareGanttData() {
    const datasets = mockProcesses.map((process, index) => ({
        label: process.name,
        data: [{
            x: process.startTime,
            y: index,
            duration: process.duration
        }],
        backgroundColor: [
            'rgba(59, 130, 246, 0.5)',   // Blue
            'rgba(16, 185, 129, 0.5)',   // Green
            'rgba(249, 115, 22, 0.5)',   // Orange
            'rgba(139, 92, 246, 0.5)',   // Purple
            'rgba(236, 72, 153, 0.5)'    // Pink
        ][index],
        borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(249, 115, 22)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)'
        ][index],
        borderWidth: 1
    }));

    return datasets;
}

// Create Gantt Chart
const ganttChart = new Chart(
    document.getElementById('gantt-chart'),
    {
        type: 'bar',
        data: {
            datasets: prepareGanttData()
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    position: 'top',
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Time (seconds)'
                    },
                    min: 0,
                    max: 15
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Processes'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = context.dataset.data[context.dataIndex];
                            return `${context.dataset.label}: Start=${data.x}s, Duration=${data.duration}s`;
                        }
                    }
                }
            }
        }
    }
);

// Performance Chart
const performanceChart = new Chart(
    document.getElementById('performance-chart'),
    {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Performance Score',
                data: initialPerformanceData,
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100
                }
            },
            animation: {
                duration: 1000
            }
        }
    }
);

// Energy Consumption Chart
const energyChart = new Chart(
    document.getElementById('energy-chart'),
    {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Energy Usage (watts)',
                data: initialEnergyData,
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Energy Consumption'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Energy Usage: ${context.parsed.y}W`;
                        }
                    }
                }
            },
            animation: {
                duration: 1000
            }
        }
    }
);

// Initialize
populateProcessList();
const initialCpuUsage = updateCPUUsage();
updateEnergyEfficiency(initialCpuUsage);

// Update data periodically
setInterval(() => {
    // Update CPU and energy efficiency
    const cpuUsage = updateCPUUsage();
    const efficiency = updateEnergyEfficiency(cpuUsage);
    
    // Update energy chart with decreasing trend
    energyChart.data.datasets[0].data.shift();
    const lastValue = energyChart.data.datasets[0].data[energyChart.data.datasets[0].data.length - 1];
    const newValue = Math.max(60, lastValue - (Math.random() * 2));
    energyChart.data.datasets[0].data.push(newValue);
    energyChart.update();

    // Update performance chart
    performanceChart.data.datasets[0].data.shift();
    const lastPerf = performanceChart.data.datasets[0].data[performanceChart.data.datasets[0].data.length - 1];
    const newPerf = Math.min(95, lastPerf + (Math.random() * 1.5));
    performanceChart.data.datasets[0].data.push(newPerf);
    performanceChart.update();
}, 2000); 