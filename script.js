const songs = [
  {
    name: "Despacito",
    artist: "Luis Fonsi Ft.Puerto Rican",
    song: "media/Despacito (CMBeats Remix).mp3",
    image: "media/468-thumbnail.png",
  },
  {
    name: "Shape of you",
    artist: "Ed Sheeran",
    song: "media/Shape of You - Ed Sheeran.mp3",
    image: "media/shape of you-thumbnail.jpeg",
  },
  {
    name: "Faded",
    artist: "Alan Walker",
    song: "media/Alan Walker - Faded.mp3",
    image: "media/faded.jpeg",
  },
];

let currentSongIndex = 0;
const progress = document.getElementById("progress");
const ctrlContainer = document.getElementById("ctrlIconContainer");
const detailContainer = document.getElementById("song-detail-container");
let song = null;

function updatePlayIcon(isPlaying) {
  const icon = ctrlContainer.querySelector("i, svg");
  if (!icon) return;

  const classNames = ["fa-solid", isPlaying ? "fa-pause" : "fa-play"];

  if (icon.classList) {
    icon.classList.remove("fa-play", "fa-pause", "fa-solid");
    icon.classList.add(...classNames);
  } else {
    icon.setAttribute("class", classNames.join(" "));
  }
}

function setSongEvents() {
  if (!song) return;

  song.addEventListener("loadedmetadata", function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
  });

  song.ontimeupdate = function () {
    progress.value = song.currentTime;
  };

  song.onended = function () {
    getNext(true);
  };
}

function loadSong(index) {
  const current = songs[index];

  detailContainer.innerHTML = `
    <img src="${current.image}" class="song-img">
    <h1>${current.name}</h1>
    <p>${current.artist}</p>
    <audio id="song" preload="metadata">
      <source src="${current.song}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  `;

  song = document.getElementById("song");
  setSongEvents();
  progress.value = 0;
  progress.max = 0;
  updatePlayIcon(false);
}

function playPause() {
  if (!song) return;

  if (song.paused) {
    song.play();
    updatePlayIcon(true);
  } else {
    song.pause();
    updatePlayIcon(false);
  }
}

progress.oninput = function () {
  if (!song) return;
  song.currentTime = progress.value;
};

function getPrevious() {
  const wasPlaying = song && !song.paused;

  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = songs.length - 1;
  }

  loadSong(currentSongIndex);

  if (wasPlaying && song) {
    song.play();
    updatePlayIcon(true);
  }
}

function getNext(autoPlay = false) {
  const wasPlaying = autoPlay ? true : (song && !song.paused);

  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }

  loadSong(currentSongIndex);

  if (wasPlaying && song) {
    song.play();
    updatePlayIcon(true);
  }
}

loadSong(currentSongIndex);