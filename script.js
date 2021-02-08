const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// musica
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// verifica si esta reproduciendo una cancion
let isPlaying = false;

// controladores del reproductor
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// actualiza el DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
};

// cancion actual
let songIndex = 0;

// on load - primera cancion
loadSong(songs[songIndex]);

// funcion encargada de calcular segundos y minutos de la duracion total y el tiempo actual de reproduccion
const displayTime = (time, operator) => {
  if (operator === '/') {
    // obtengo los minutos
    n = Math.floor(time / 60);
  } else {
    // obtengo los segundos
    n = Math.floor(time % 60);
    // paso a 2 digitos los segundos
    if (n < 10) {
      n = `0${n}`;
    }
  }
  return n;
};

// actualiza la barra de progreso y el tiempo
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // actualiza la barra
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calcula la duracion total
    const durationMinutes = displayTime(duration, '/');
    let durationSeconds = displayTime(duration, '%');
    // tiempo actualizado de reproduccion
    const currentMinutes = displayTime(currentTime, '/');
    let currentSeconds = displayTime(currentTime, '%');
    // evita que se imprima NaN
    if (currentSeconds && durationSeconds) {
      // actualiza la duracion en el DOM
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
};

// actualiza la reproduccion segun el punto en la barra de duracion
const setProgressBar = (e) => {
  const width = e.srcElement.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

// event listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
