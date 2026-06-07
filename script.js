let progress = document.getElementById("progress");
    let song = document.getElementById("song");
    let ctrlContainer = document.getElementById("ctrlIconContainer");

    song.addEventListener("loadedmetadata", function () {
      progress.max = song.duration;
      progress.value = song.currentTime;
    });

    function playPause() {
      let icon = ctrlContainer.querySelector("i, svg");

      if (song.paused) {
        song.play();
        if (icon.tagName === "svg") {
          icon.classList.remove("fa-play");
          icon.classList.add("fa-pause");
        } else {
          icon.className = "fa-solid fa-pause";
        }
      } else {
        song.pause();
        if (icon.tagName === "svg") {
          icon.classList.remove("fa-pause");
          icon.classList.add("fa-play");
        } else {
          icon.className = "fa-solid fa-play";
        }
      }
    }

    song.ontimeupdate = function () {
      progress.value = song.currentTime;
    };

    progress.oninput = function () {
      song.currentTime = progress.value;
    };

    song.onended = function () {
      let icon = ctrlContainer.querySelector("i, svg");

      progress.value = 0;
      song.currentTime = 0;

      if (icon.tagName === "svg") {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
      } else {
        icon.className = "fa-solid fa-play";
      }
    };