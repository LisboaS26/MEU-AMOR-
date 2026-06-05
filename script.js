console.log("JS carregou");

console.log("SCRIPT CARREGOU");

console.log("script carregou");

console.log("btn:", document.getElementById("musicBtn"));
console.log("music:", document.getElementById("ourMusic"));

let audioCtx;
let analyser;
let source;
let equalizerStarted = false;

let dataArray;
let bars;

function scrollToPlaylist(){
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
}

function showMessage(text){
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popupText").innerText = text;
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}

/* ⭐ DATA DO RELACIONAMENTO */

const musicCard = document.querySelector(".playlist .song-card");
const equalizer = document.getElementById("equalizer");
const music = document.getElementById("ourMusic");
const btn = document.getElementById("musicBtn");
const progressBar = document.getElementById("progressBar");

const startDate = new Date("2024-06-10T00:00:00");

function updateCounter(){

  const now = new Date();

  let diff = now - startDate;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("timeTogether").innerHTML =
  `
    ${days} dias <br>
    ${hours} horas :
    ${minutes} minutos :
    ${seconds} segundos 🤍
  `;
}

setInterval(updateCounter, 1000);
updateCounter();



/* 🎵 TOGGLE ÚNICO E CORRETO */
function toggleMusic(){

  if(!music || !btn) return;

  if(music.paused){

    music.play();
    btn.innerHTML = "⏸ pausar música";

    equalizer.style.opacity = "1";

    // cria audio só 1 vez
    if(!equalizerStarted){

      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;

      source = audioCtx.createMediaElementSource(music);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      dataArray = new Uint8Array(analyser.frequencyBinCount);
      bars = equalizer.querySelectorAll("span");

      animateEqualizer();

      equalizerStarted = true;
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

  } else {

    music.pause();
    btn.innerHTML = "▶ tocar música";

    equalizer.style.opacity = "0";

if(!equalizerStarted){

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();

  analyser.fftSize = 64;

  source = audioCtx.createMediaElementSource(music);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  dataArray = new Uint8Array(analyser.frequencyBinCount);
  bars = equalizer.querySelectorAll("span");

  animateEqualizer();

  equalizerStarted = true;

  function animatePulse(){

  requestAnimationFrame(animatePulse);

  analyser.getByteFrequencyData(dataArray);

  // pega o grave (primeiras frequências)
  let bass = dataArray[2] + dataArray[5] + dataArray[8];

  if(bass > 70){

    musicCard.classList.add("pulse");

    setTimeout(() => {
      musicCard.classList.remove("pulse");
    }, 600);

    function animateBackgroundPulse(){

  requestAnimationFrame(animateBackgroundPulse);

  analyser.getByteFrequencyData(dataArray);

  let sum = 0;

  for(let i = 0; i < dataArray.length; i++){
    sum += dataArray[i];
  }

  let avg = sum / dataArray.length;

  // intensidade do efeito (ajuste aqui)
  let intensity = avg / 255;

  const phone = document.querySelector(".phone");

  phone.style.filter = `brightness(${1 + intensity * 0.15}) saturate(${1 + intensity * 0.2})`;

}

  }
}
}
  }
}

/* ⭐ ESTRELAS */
function createStars() {

  const starsContainer = document.querySelector(".stars");

  if (!starsContainer) return;

  for (let i = 0; i < 120; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    star.style.width = (Math.random() * 3 + 1) + "px";
    star.style.height = star.style.width;

    star.style.opacity = Math.random();
    star.style.animationDuration = (3 + Math.random() * 5) + "s";

    starsContainer.appendChild(star);
  }
}

window.addEventListener("DOMContentLoaded", () => {

  const music = document.getElementById("ourMusic");
  const btn = document.getElementById("musicBtn");
  const progressBar = document.getElementById("progressBar");

  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  music.addEventListener("loadedmetadata", () => {
    progressBar.max = music.duration;
    durationEl.innerHTML = formatTime(music.duration);
  });

  music.addEventListener("timeupdate", () => {
    progressBar.value = music.currentTime;
    currentTimeEl.innerHTML = formatTime(music.currentTime);
  });

  progressBar.addEventListener("input", () => {
    music.currentTime = progressBar.value;
  });

});

window.addEventListener("load", () => {
  createStars();
});

setInterval(() => {

  const stars = document.querySelectorAll(".star");

  stars.forEach(star => {

    if(!music.paused){

      const scale = 1 + Math.random() * 1.5;

      star.style.transform = `scale(${scale})`;

      star.style.opacity = 0.6 + Math.random();

      star.style.boxShadow = `
        0 0 12px rgba(255, 0, 80, 0.9),
        0 0 25px rgba(255, 0, 80, 0.5)
      `;

    } else {

      star.style.transform = "scale(1)";
      star.style.opacity = 0.7;

      star.style.boxShadow = `
        0 0 8px rgba(255, 0, 80, 0.6),
        0 0 15px rgba(255, 0, 80, 0.3)
      `;

    }

  });

}, 350);

window.addEventListener("scroll", () => {

  const stars = document.querySelectorAll(".star");

  const scrollY = window.scrollY;

  stars.forEach((star, index) => {

    const speed = (index % 5 + 1) * 0.15;

    star.style.transform = `
      translateY(${scrollY * speed * 0.08}px)
    `;

  });

});

function animateEqualizer(){

  requestAnimationFrame(animateEqualizer);

  analyser.getByteFrequencyData(dataArray);

  bars.forEach((bar, index) => {

    let value = dataArray[index] || 0;
    let height = (value / 255) * 20;

    bar.style.height = `${height}px`;

  });

}

function createShootingStar(){

  const star = document.createElement("div");
  star.classList.add("shooting-star");

  document.querySelector(".phone").appendChild(star);

  const startY = Math.random() * window.innerHeight;

  star.style.top = startY + "px";
  star.style.left = "-50px";

  setTimeout(() => {
    star.remove();
  }, 1200);
}

setInterval(() => {
  if(Math.random() < 0.35){
    createShootingStar();
  }
}, 2500);

animateEqualizer();
animatePulse();
animateBackgroundPulse();
