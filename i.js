let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

function startStop() {
    const startStopBtn = document.getElementById('startStopBtn');
    const lapBtn = document.getElementById('lapBtn');

    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#28a745';
        lapBtn.disabled = true;
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = '#ffc107';
        lapBtn.disabled = false;
    }

    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    lapTimes = [];
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    const lapsContainer = document.querySelector('.laps-container');
    lapsContainer.classList.remove('show'); // Hide the laps container on reset
    const startStopBtn = document.getElementById('startStopBtn');
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    document.getElementById('lapBtn').disabled = true;
}

function recordLap() {
    const now = Date.now();
    const time = new Date(elapsedTime + (now - startTime));
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0');
    const lapTime = `${minutes}:${seconds}:${milliseconds}`;

    lapTimes.push(lapTime);
    displayLaps();

    const lapsContainer = document.querySelector('.laps-container');
    lapsContainer.classList.add('show'); // Show the laps container when a lap is recorded
}

function displayLaps() {
    const lapsDiv = document.getElementById('laps');
    lapsDiv.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const lapDiv = document.createElement('div');
        lapDiv.className = 'lap';
        lapDiv.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapsDiv.appendChild(lapDiv);
        // Trigger the transition by adding the 'show' class
        setTimeout(() => {
            lapDiv.classList.add('show');
        }, 10); // Small timeout to ensure the element is added to the DOM before adding the class
    });
}

function updateDisplay() {
    const now = Date.now();
    const time = new Date(elapsedTime + (now - startTime));
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0');

    document.getElementById('display').textContent = `${minutes}:${seconds}:${milliseconds}`;
}
