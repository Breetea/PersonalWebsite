// silly.js

// ── Sound effects ─────────────────────────────────────────────────────────────
const sounds = {
  click:   new Audio("assets/audio/Nierclick.wav"),
  confirm: new Audio("assets/audio/Nierconfirm.wav"),
  cancel:  new Audio("assets/audio/Niercancel.wav"),
  switch:  new Audio("assets/audio/Nierswitch.wav"),
  aaaa:    new Audio("assets/audio/Aaah~.mp3"),
};

for (const audio of Object.values(sounds)) {
  audio.preload = "auto";
}

let sfxMuted = false;

function playSound(key) {
  if (sfxMuted) return;
  const audio = sounds[key];
  if (!audio) return;
  audio.currentTime = 0;
  const p = audio.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-sound]");
  if (!el) return;
  playSound(el.dataset.sound);
});

// ── Ambient music loop: neamb1 once → loop neamb2/neamb3 ─────────────────────
const amb1 = new Audio("assets/audio/New%20Eden%20-%20Am1.mp3");
const amb2 = new Audio("assets/audio/New%20Eden%20-%20Am2.mp3");
const amb3 = new Audio("assets/audio/New%20Eden%20-%20Am3.mp3");

amb1.preload = "auto";
amb2.preload = "auto";
amb3.preload = "auto";

amb1.volume = 0.05;
amb2.volume = 0.05;
amb3.volume = 0.05;

// After neamb1 ends, alternate neamb2 → neamb3 → neamb2 → …
let ambLoopNext = amb2; // first loop track after neamb1

amb1.addEventListener("ended", () => {
  ambLoopNext.currentTime = 0;
  ambLoopNext.play().catch(() => {});
});

amb2.addEventListener("ended", () => {
  amb3.currentTime = 0;
  amb3.play().catch(() => {});
});

amb3.addEventListener("ended", () => {
  amb2.currentTime = 0;
  amb2.play().catch(() => {});
});

let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  amb1.play().catch(() => {});
}

// Start on first user interaction
document.addEventListener("click", startMusic, { once: true });

// ── Mute toggles ──────────────────────────────────────────────────────────────
const musicMuteBtn = document.getElementById("music-mute-btn");
const sfxMuteBtn   = document.getElementById("sfx-mute-btn");

let musicMuted = false;

musicMuteBtn.addEventListener("click", () => {
  startMusic(); // ensure music started if this is the first click
  musicMuted = !musicMuted;
  amb1.muted = musicMuted;
  amb2.muted = musicMuted;
  amb3.muted = musicMuted;
  musicMuteBtn.textContent = musicMuted ? "🔇 Music" : "🔊 Music";
});

sfxMuteBtn.addEventListener("click", () => {
  sfxMuted = !sfxMuted;
  sfxMuteBtn.textContent = sfxMuted ? "🔕 SFX" : "🔔 SFX";
});

// ── Misc utilities ────────────────────────────────────────────────────────────
//thanks percy <3
function copyCode(num) {
  if (num == 1) {
    navigator.clipboard.writeText('<a href="https://breetea.nekoweb.org/"><img src= "https://breetea.nekoweb.org/assets/Breebutton.gif"/></a>');
    document.getElementById("copynotif").innerHTML = "Button code copied!";
  }
  if (num == 2) {
    navigator.clipboard.writeText('<a href="https://breetea.nekoweb.org/"><img src= "https://breetea.nekoweb.org/assets/WBjetbrains-madebybreewedtea.gif"/></a>');
    document.getElementById("copynotif").innerHTML = "Button code copied!";
  }
  if (num == 3) {
    navigator.clipboard.writeText('<a href="https://breetea.nekoweb.org/"><img src= "https://breetea.nekoweb.org/assets/jetbrainside-madebybreewedtea.gif"/></a>');
    document.getElementById("copynotif").innerHTML = "Button code copied!";
  }
}

window.copyCode = copyCode;
