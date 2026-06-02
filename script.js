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

/* DATA DO RELACIONAMENTO */

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

let playlistAudio = new Audio("COLOQUE_LINK_DA_PLAYLIST_AQUI");
let ourSongAudio = new Audio("COLOQUE_LINK_DA_MUSICA_AQUI");

function playPlaylist(){
  ourSongAudio.pause();
  playlistAudio.play();
}

function playOurSong(){
  playlistAudio.pause();
  ourSongAudio.play();
}

const music = document.getElementById("ourMusic");

function toggleMusic(){

  if(!music) return;

  if(music.paused){
    music.play();
    createStars();
  } else {
    music.pause();
  }

}

/* ⭐ ESTRELAS */
const starsContainer = document.querySelector(".stars");

function createStars() {
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    star.style.animationDuration = (3 + Math.random() * 5) + "s";
    star.style.opacity = Math.random();

    starsContainer.appendChild(star);
  }
}
  
