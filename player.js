
     const playlist = [
    {
      title: "Ammaadi",
      artist: "Shakthisree Gopalan",
      url: "songs/Ammaadi.mp3",
      albumArt: "images/ammadi.jpg",
    },
    {
      title: "Animal",
      artist: "Samuel Bayer",
      url: "songs/Animals.mp3",
      albumArt: "images/animal.jpg",
    },
    {
      title: "Emai poyave",
      artist: "Krishna Chaitanya",
      albumArt: "./images/emai_poyave.jpg",
      url: "./songs/[iSongs.info] 04 - Emai Poyave.mp3",
    },
    {
      title: "Evare",
      artist: "Vijay Yesudas",
      albumArt: "./images/evare.jpg",
      url: "./songs/1-Evare-SenSongsMp3.Co.mp3",
    },
    {
        title: " husn",
        artist:"Anuv Jain",
        albumArt: "./images/husn.jpg",
        url: "./songs/Husn(PagalWorld.com.so).mp3",
      },
      {
        title: "Life of Ram",
        artist: "Govind Vasantha",
        albumArt: "./images/life_of_ram.jpg",
        url: "./songs/The Life Of Ram - SenSongsMp3.Co.mp3",
      },
      {
        title: "Monna kanipinchavu",
        artist: "Naresh iyer",
        albumArt: "./images/monna.jpg",
      url: "./songs/[iSongs.info] 04 - Monna Kanipinchavu.mp3",
      },
      {
        title: "Naade Parindhy",
        artist: "A.R.Rahman",
        albumArt: "./images/naade_parindhy.jpg",
        url: "./songs/128-Nadaan Parindey - Rockstar 128 Kbps.mp3",
      },
      {
        title: "Scars to Your Beautiful",
        artist: "Alessia Cars",
        albumArt: "./images/scars_to_beautiful.jpg",
        url: "./songs/Scars-To-Your-Beautiful(PagalNew.Com.Se).mp3",
      },
      {
        title: "Shaayad",
        artist: "Arjith Singh",
        albumArt: "./images/shayad.jpg",
        url: "./songs/192-Shayad (Reprise) - Love Aaj Kal 192 Kbps.mp3",
      },
  ];

    let currentTrackIndex = 0; // Default to first song
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;

    const audioPlayer = document.getElementById("audio-player");
    const playBtn = document.getElementById("play-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const forwardBtn = document.getElementById("forward-btn");
    const backwardBtn = document.getElementById("backward-btn");
    const shuffleBtn = document.getElementById("shuffle-btn");
    const repeatBtn = document.getElementById("repeat-btn");
    const volumeControl = document.getElementById("volume-control");
    const seekBar = document.getElementById("seek-bar");
    const songTitle = document.getElementById("song-title");
    const songArtist = document.getElementById("song-artist");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalDurationDisplay = document.getElementById("total-duration");
    const albumArt = document.getElementById("album-art");

    function getSongIndexFromURL() {
        const params = new URLSearchParams(window.location.search);
        const songIndex = params.get('song');
        return songIndex ? parseInt(songIndex, 10) : 0; // Default to 0 if no song is specified
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }

    function loadTrack(index) {
        const track = playlist[index];
        audioPlayer.src = track.url;
        songTitle.textContent = track.title;
        songArtist.textContent = track.artist;
        albumArt.src = track.albumArt;

        audioPlayer.onloadedmetadata = function() {
            totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
        };

        // Resetting the seek bar when loading a new track
        seekBar.value = 0;
        currentTimeDisplay.textContent = '0:00';
    }

    function playTrack() {
        audioPlayer.play();
        isPlaying = true;
        playBtn.textContent = "Pause";
    }

    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        playBtn.textContent = "Play";
    }

    playBtn.addEventListener("click", () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    nextBtn.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    prevBtn.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    forwardBtn.addEventListener("click", () => {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 10, audioPlayer.duration);
    });

    backwardBtn.addEventListener("click", () => {
        audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0);
    });

    shuffleBtn.addEventListener("click", () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle("active", isShuffle);
    });

    repeatBtn.addEventListener("click", () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle("active", isRepeat);
    });

    audioPlayer.addEventListener("ended", () => {
        if (isRepeat) {
            loadTrack(currentTrackIndex);
            playTrack();
        } else {
            nextBtn.click(); // Go to next track
        }
    });

    audioPlayer.addEventListener("timeupdate", () => {
        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    });

    seekBar.addEventListener("input", () => {
        audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
    });

    volumeControl.addEventListener("input", () => {
        audioPlayer.volume = volumeControl.value;
    });

    // Initialize the player with the song index from the URL
    currentTrackIndex = getSongIndexFromURL();
    loadTrack(currentTrackIndex);