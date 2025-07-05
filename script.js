let startTime, interval, elapsed = 0, lapCount = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const totalTimeDisplay = document.getElementById('total-time');
const fastestLapDisplay = document.getElementById('fastest-lap');
const slowestLapDisplay = document.getElementById('slowest-lap');
const averageLapDisplay = document.getElementById('average-lap');
const laps = document.getElementById('laps');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');

function formatTime(ms) {
  const date = new Date(ms);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  timeDisplay.textContent = formatTime(diff);
  totalTimeDisplay.textContent = formatTime(diff);
}

function updateLapStats() {
  if (lapTimes.length === 0) return;

  const min = Math.min(...lapTimes);
  const max = Math.max(...lapTimes);
  const avg = lapTimes.reduce((a, b) => a + b, 0) / lapTimes.length;

  fastestLapDisplay.textContent = formatTime(min);
  slowestLapDisplay.textContent = formatTime(max);
  averageLapDisplay.textContent = formatTime(avg);
}

startBtn.addEventListener('click', () => {
  startTime = Date.now();
  interval = setInterval(updateTime, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
  resetBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
  clearInterval(interval);
  elapsed += Date.now() - startTime;
  startBtn.textContent = "Resume";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  elapsed = 0;
  lapCount = 0;
  lapTimes = [];
  timeDisplay.textContent = "00:00:00.000";
  totalTimeDisplay.textContent = "00:00:00.000";
  fastestLapDisplay.textContent = "-";
  slowestLapDisplay.textContent = "-";
  averageLapDisplay.textContent = "-";
  laps.innerHTML = "";
  startBtn.textContent = "Start";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
  const currentTime = Date.now() - startTime + elapsed;
  lapCount++;
  const lapTime = lapTimes.length === 0 ? currentTime : currentTime - lapTimes.reduce((a, b) => a + b, 0);
  lapTimes.push(lapTime);
  const lap = document.createElement('p');
  lap.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
  laps.prepend(lap);
  updateLapStats();
});
