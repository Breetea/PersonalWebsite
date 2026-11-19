// silly.js

const sounds = { //sound effects
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

// ── Ambient music loop ────────────────────────────────────────────────────────
const AMB_VOLUME    = 0.05;
const LOOKAHEAD_SEC = 0.3; // preload next track slightly early for seamless transition

const amb1 = new Audio("assets/audio/New%20Eden%20-%20Am1.mp3");
const amb2 = new Audio("assets/audio/New%20Eden%20-%20Am2.mp3");
const amb3 = new Audio("assets/audio/New%20Eden%20-%20Am3.mp3");

[amb1, amb2, amb3].forEach(a => {
  a.preload = "auto";
  a.volume  = AMB_VOLUME;
});

// neamb1 → neamb2 → neamb3 → neamb2 → neamb3 → …
const ambNext = new Map([
  [amb1, amb2],
  [amb2, amb3],
  [amb3, amb2],
]);

let amb1Done = false;

function scheduleNext(current) {
  if (current._seamlessWired) return;
  current._seamlessWired = true;

  current.addEventListener("timeupdate", function onUpdate() {
    if (!current.duration || current.duration === Infinity) return;

    const remaining = current.duration - current.currentTime;

    if (current === amb1 && amb1Done) return;

    if (remaining <= LOOKAHEAD_SEC) {
      const next = ambNext.get(current);
      if (!next) return;

      current.removeEventListener("timeupdate", onUpdate);

      next.currentTime = 0;
      next.muted = current.muted;
      next.play().catch(() => {});

      scheduleNext(next);

      setTimeout(() => {
        current.pause();
        current.currentTime = 0;
        current._seamlessWired = false;
      }, Math.max(remaining * 1000 + 200, 0));
    }
  });
}

let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  scheduleNext(amb1);
  amb1.play().catch(() => {});
}

// ── Mute toggles ──────────────────────────────────────────────────────────────
const musicMuteBtn = document.getElementById("music-mute-btn");
const sfxMuteBtn   = document.getElementById("sfx-mute-btn");

if (musicMuteBtn && sfxMuteBtn) {
  document.addEventListener("click", startMusic, { once: true });

  let musicMuted = false;

  musicMuteBtn.addEventListener("click", () => {
    startMusic();
    musicMuted = !musicMuted;
    amb1.muted = musicMuted;
    amb2.muted = musicMuted;
    amb3.muted = musicMuted;
    musicMuteBtn.innerHTML = musicMuted
      ? '<img src="assets/icons/IconMusicMute.png" alt="Music muted" class="mute-icon">'
      : '<img src="assets/icons/IconMusic.png" alt="Music" class="mute-icon">';
  });

  sfxMuteBtn.addEventListener("click", () => {
    sfxMuted = !sfxMuted;
    sfxMuteBtn.innerHTML = sfxMuted
      ? '<img src="assets/icons/IconSpeakerMute.png" alt="SFX muted" class="mute-icon">'
      : '<img src="assets/icons/IconSpeaker.png" alt="SFX" class="mute-icon">';
  });
}


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
