// audio.js
// staight up used ai cuz fuck JS


// Map button -> audio file in /assets/audio
const sounds = {
  click: new Audio("assets/audio/Nierclick.wav"),
  confirm: new Audio("assets/audio/Nierconfirm.wav"),
  cancel: new Audio("assets/audio/Niercancel.wav"),
  switch: new Audio("assets/audio/Nierswitch.wav"),
  mahaline: new Audio("assets/audio/Mahaline.mp3"),
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