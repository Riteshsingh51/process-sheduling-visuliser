// Variables to store process data
let numProcesses;
let burstTimes = [];
let arrivalTimes = [];

document.getElementById("processForm").addEventListener("submit", function (e) {
    e.preventDefault();
    numProcesses = parseInt(document.getElementById("numProcesses").value);
    generateInputFields();
});

// Function to dynamically generate input fields for each process
function generateInputFields() {
    let container = document.getElementById("inputFieldsContainer");
    container.innerHTML = ""; // Clear previous input fields

    for (let i = 0; i < numProcesses; i++) {
        container.innerHTML += `
            <div class="process-input">
                <label for="burstTime${i}">Burst Time of Process ${i + 1}:</label>
                <input type="number" id="burstTime${i}" required>
                <label for="arrivalTime${i}">Arrival Time of Process ${i + 1}:</label>
                <input type="number" id="arrivalTime${i}" required>
            </div>
        `;
    }
    document.getElementById("calculateBtn").style.display = "block";
}

// Function to calculate the FCFS scheduling
function calculateScheduling() {
    for (let i = 0; i < numProcesses; i++) {
        burstTimes.push(parseInt(document.getElementById(`burstTime${i}`).value));
        arrivalTimes.push(parseInt(document.getElementById(`arrivalTime${i}`).value));
    }

    // FCFS algorithm calculation
    let completionTimes = [];
    let waitingTimes = [];
    let turnaroundTimes = [];
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    
    let currentTime = 0;

    for (let i = 0; i < numProcesses; i++) {
        if (arrivalTimes[i] > currentTime) {
            currentTime = arrivalTimes[i];
        }

        completionTimes[i] = currentTime + burstTimes[i];
        turnaroundTimes[i] = completionTimes[i] - arrivalTimes[i];
        waitingTimes[i] = turnaroundTimes[i] - burstTimes[i];

        totalWaitingTime += waitingTimes[i];
        totalTurnaroundTime += turnaroundTimes[i];

        currentTime = completionTimes[i];
    }

    let avgWaitingTime = totalWaitingTime / numProcesses;
    let avgTurnaroundTime = totalTurnaroundTime / numProcesses;

    document.getElementById("averageWaitingTime").innerText = `Average Waiting Time: ${avgWaitingTime.toFixed(2)}`;
    document.getElementById("averageTurnaroundTime").innerText = `Average Turnaround Time: ${avgTurnaroundTime.toFixed(2)}`;

    visualizeProcesses();
}

// Function to visualize the processes
function visualizeProcesses() {
    let container = document.getElementById("processVisualization");
    container.innerHTML = ""; // Clear previous visualization

    for (let i = 0; i < numProcesses; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.width = `${burstTimes[i] * 20}px`; // Scale the burst time
        bar.innerText = `P${i + 1}`;
        container.appendChild(bar);
    }
}
