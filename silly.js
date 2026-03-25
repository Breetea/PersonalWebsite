// audio.js
//  straight up used ai cuz fuck JS
// Map button -> audio file in /assets/audio
const sounds = {
  click: new Audio("assets/audio/Nierclick.wav"),
  confirm: new Audio("assets/audio/Nierconfirm.wav"),
  cancel: new Audio("assets/audio/Niercancel.wav"),
  switch: new Audio("assets/audio/Nierswitch.wav"),
  mahaline: new Audio("assets/audio/Mahaline.mp3"),
  catalyst: new Audio("assets/audio/Synthesis_Catalyst.mp3"),
  aaaa: new Audio("assets/audio/Aaah~.mp3"),
};

// Optional: reduce perceived delay on first play
for (const audio of Object.values(sounds)) {
  audio.preload = "auto";
}

function playSound(key) {
  const audio = sounds[key];
  if (!audio) return;

  // If the same sound is clicked rapidly, restart it
  audio.currentTime = 0;

  // Some browsers return a promise; ignore failures silently (e.g., blocked autoplay)
  const p = audio.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

// Handles both <button data-sound> and <a data-sound>
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-sound]");
  if (!el) return;
  playSound(el.dataset.sound);
});

//thanks percy >3

function copyCode(num){
    if (num == 1){
        navigator.clipboard.writeText('<a href="https://breetea.nekoweb.org/"><img src= "https://breetea.nekoweb.org/assets/Breebutton.gif"/></a>');
        document.getElementById("copynotif").innerHTML = "Button code copied!";
    }
  if (num == 2){
    navigator.clipboard.writeText('<a href="https://breetea.nekoweb.org/"><img src= "https://breetea.nekoweb.org/assets/WBjetbrains-madebybreewedtea.gif"/></a>');
    document.getElementById("copynotif").innerHTML = "Button code copied!";
  }
  if (num == 3){
    navigator.clipboard.writeText('<a href="https://breetea.nekoweb.org/"><img src= "https://breetea.nekoweb.org/assets/jetbrainside-madebybreewedtea.gif"/></a>');
    document.getElementById("copynotif").innerHTML = "Button code copied!";
  }
}

window.copyCode = copyCode;

// Audio player functionality
const bgAudio = document.getElementById('bg-audio');
const songTitle = document.getElementById('song-title');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const volumeDisplay = document.getElementById('volume-display');

// Song map with display names
const songs = [
    { key: 'mahaline', name: 'Mahaline', path: 'assets/audio/Mahaline.mp3' },
    { key: 'catalyst', name: 'Synthesis Catalyst', path: 'assets/audio/Synthesis_Catalyst.mp3' },
    { key: 'aaaa', name: 'Aaah~', path: 'assets/audio/Aaah~.mp3' }
];

let currentSongIndex = 0;

// Initialize
bgAudio.volume = 0.05;
updateSongTitle();

// Play/Pause toggle
playBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
        playBtn.textContent = '⏸';
    } else {
        bgAudio.pause();
        playBtn.textContent = '▶';
    }
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
});

// Load and play song
function loadSong() {
    const song = songs[currentSongIndex];
    bgAudio.src = song.path;
    updateSongTitle();
    bgAudio.play().catch(() => {});
    playBtn.textContent = '⏸';
}

// Update song title display
function updateSongTitle() {
    songTitle.textContent = songs[currentSongIndex].name;
}

// Progress bar
bgAudio.addEventListener('timeupdate', () => {
    if (bgAudio.duration) {
        const percent = (bgAudio.currentTime / bgAudio.duration) * 100;
        progressBar.value = percent;
        progressBar.style.setProperty('--value', percent + '%');
    }
});

progressBar.addEventListener('input', (e) => {
    if (bgAudio.duration) {
        bgAudio.currentTime = (e.target.value / 100) * bgAudio.duration;
    }
});

// Auto-play next song when current ends
bgAudio.addEventListener('ended', () => {
    nextBtn.click();
});

// Volume slider
volumeSlider.addEventListener('input', (e) => {
    const volumePercent = e.target.value;
    bgAudio.volume = volumePercent / 100;
    volumeDisplay.textContent = volumePercent + '%';
    e.target.style.setProperty('--value', volumePercent + '%');
});

// Start music on first interaction
document.addEventListener('click', () => {
    if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
        playBtn.textContent = '⏸';
    }
}, { once: true });

// Initialize volume display
const initialVolume = Math.round(bgAudio.volume * 100);
volumeSlider.value = initialVolume;
volumeDisplay.textContent = initialVolume + '%';
volumeSlider.style.setProperty('--value', initialVolume + '%');