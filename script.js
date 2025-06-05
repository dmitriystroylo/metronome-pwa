let audioCtx = null;
let intervalId = null;
let isPlaying = false;
let bpm = 120;

const bpmSlider = document.getElementById('bpm');
const bpmValue = document.getElementById('bpmValue');
const toggleBtn = document.getElementById('toggle');

// Load sounds
const kick = new Audio('kick.wav');
const snare = new Audio('snare.wav');

let beatCount = 0;

function tick() {
  beatCount = (beatCount % 4) + 1;

  const sound = (beatCount === 1) ? kick : snare;
  sound.currentTime = 0;
  sound.play();
}

bpmSlider.oninput = () => {
  bpm = bpmSlider.value;
  bpmValue.textContent = bpm;
  if (isPlaying) {
    stopMetronome();
    startMetronome();
  }
};

toggleBtn.onclick = () => {
  isPlaying ? stopMetronome() : startMetronome();
};

function startMetronome() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  isPlaying = true;
  toggleBtn.textContent = 'Stop';
  const interval = 60000 / bpm;
  beatCount = 0;
  tick();
  intervalId = setInterval(tick, interval);
}

function stopMetronome() {
  isPlaying = false;
  toggleBtn.textContent = 'Start';
  clearInterval(intervalId);
}
