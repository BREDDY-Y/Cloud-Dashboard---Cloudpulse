const cpuBar = document.getElementById("cpu");
const memoryBar = document.getElementById("memory");
const storageBar = document.getElementById("storage");
const networkBar = document.getElementById("network");
const cpuText = document.getElementById("cpu-text");
const memoryText = document.getElementById("memory-text");
const storageText = document.getElementById("storage-text");
const networkText = document.getElementById("network-text");
const costText = document.getElementById("cost-text");

// Historical data
const labels = [];
const cpuData = [];
const memoryData = [];
const storageData = [];
const networkData = [];
const costData = [];

// Chart.js
const ctx = document.getElementById("metricsChart").getContext("2d");
const metricsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            { label: "CPU %", data: cpuData, borderColor: "#ff4d4d", backgroundColor: "rgba(255,77,77,0.2)", tension: 0.3 },
            { label: "Memory %", data: memoryData, borderColor: "#4d79ff", backgroundColor: "rgba(77,121,255,0.2)", tension: 0.3 },
            { label: "Storage %", data: storageData, borderColor: "#00e676", backgroundColor: "rgba(0,230,118,0.2)", tension: 0.3 },
            { label: "Network %", data: networkData, borderColor: "#ffa500", backgroundColor: "rgba(255,165,0,0.2)", tension: 0.3 },
            { label: "Cost $", data: costData, borderColor: "#ffd700", backgroundColor: "rgba(255,215,0,0.2)", tension: 0.3 }
        ]
    },
    options: {
        responsive: true,
        plugins: { legend: { labels: { color: "#fff" } }, datalabels: { display: false } },
        scales: {
            x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
            y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" }, beginAtZero: true }
        }
    }
});

// Fetch metrics from backend
async function fetchMetrics() {
    try {
        const response = await fetch("http://127.0.0.1:5000/metrics");
        const data = await response.json();

        // Update bars
        cpuBar.style.width = data.cpu + "%";
        memoryBar.style.width = data.memory + "%";
        storageBar.style.width = data.storage + "%";
        networkBar.style.width = data.network + "%";

        // Update texts
        cpuText.innerText = data.cpu.toFixed(2) + "%";
        memoryText.innerText = data.memory.toFixed(2) + "%";
        storageText.innerText = data.storage.toFixed(2) + "%";
        networkText.innerText = data.network.toFixed(2) + "%";
        costText.innerText = "$" + data.cost.toFixed(2);

        // Historical chart
        const now = new Date().toLocaleTimeString();
        labels.push(now);
        cpuData.push(data.cpu);
        memoryData.push(data.memory);
        storageData.push(data.storage);
        networkData.push(data.network);
        costData.push(data.cost);

        if (labels.length > 20) {
            labels.shift(); cpuData.shift(); memoryData.shift(); storageData.shift(); networkData.shift(); costData.shift();
        }

        metricsChart.update();
    } catch (err) {
        console.error("Error fetching metrics:", err);
    }
}

setInterval(fetchMetrics, 3000);
fetchMetrics();
