const VideoPlayer = (function() {
  let video = null;
  let toggleBtn = null;
  let progress = null;
  let progressWrapper = null;
  let volumeControl = null;
  let speedControl = null;
  let plusSecBtn = null;
  let minusSecBtn = null;
  let mousedown = false;
  let timeout = null;

  /**
   * @desc Fucntion init.
   * @param {HTMLVideoElement} videoEl - video tag
   * @returns {Object}
   */
  function init(videoEl) {
    video = videoEl;

    _initTemplate();
    _setElements();
    _initEvents();

    return {
      play,
      stop
    };
  }

  function toggle() {
    const method = video.paused ? "play" : "pause";
    toggleBtn.textContent = video.paused ? "❚ ❚" : "►";
    video[method]();
  }

  function play() {
    video.play();
  }

  function stop() {
    video.currentTime = 0;
    video.pause();
  }

  function _initTemplate() {
    const parent = video.parentElement;

    const playerWrapper = _playerWrapperTemplate();
    const controlsTemplate = _controlsTemplate();

    playerWrapper.appendChild(video);
    playerWrapper.insertAdjacentHTML("beforeend", controlsTemplate);
    parent.insertAdjacentElement("afterbegin", playerWrapper);
  }

  function _playerWrapperTemplate() {
    const playerWrapper = document.createElement("div");
    playerWrapper.classList.add("player");
    return playerWrapper;
  }

  function _controlsTemplate() {
    return `
    <div class="player__controls">
    <div class="progress">
      <div class="progress__filled"></div>
    </div>
    <button class="player__button toggle" title="Toggle Play">►</button>
    <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1">
    <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
    <button data-skip="-1" class="player__button">« 1s</button>
    <button data-skip="1" class="player__button">1s »</button>
  </div>
    `;
  }

  function _setElements() {
    toggleBtn = document.querySelector(".toggle");
    progress = document.querySelector(".progress__filled");
    progressWrapper = document.querySelector(".progress");
    volumeControl = document.querySelector("input[name=volume]");
    speedControl = document.querySelector("input[name=playbackRate]");
    plusSecBtn = document.querySelector('button[ data-skip="1"]');
    minusSecBtn = document.querySelector('button[ data-skip="-1"]');
  }
  /**---------------------------------------------------ДЗ№9------------------------------------------------------------ *  ЗАДАНИЯ СО *:
   * 1) перемотка перетягиванием зажатой мышки на линии прогресса;
   * 2)перематывание на 1сек двойным кликом  в зависимости от положения двойного нажатия(если слева<<-1,справа>>+1).
   */
 //1),2)добавление громкости и скорости:------------------------------------------------------------------------------------------------
  function _setVolumeAndSpeed() {
    video.volume = volumeControl.value / 1;
    video.playbackRate = speedControl.value / 1;
  }

  //3)добавление перемотки вперед на 1сек и назад на 1сек----------------------------------------------------------------
  function _plusSec() {
    video.currentTime = video.currentTime + 1;
  }
  function _minusSec() {
    video.currentTime = video.currentTime - 1;
  }
  function _handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${percent}%`;
  }

  function _scrub(e) {
    video.currentTime =
      (e.offsetX / progressWrapper.offsetWidth) * video.duration;
  }

   function dbClick(e) {
    
    if ( e.offsetX > video.offsetWidth / 2) {
      clearTimeout(timeout), clearTimeout(timeout), _plusSec(),toggle();
    } else {
      clearTimeout(timeout), clearTimeout(timeout), _minusSec(), toggle();
    }
  }

  function _initEvents() {
    toggleBtn.addEventListener("click", toggle);
    video.addEventListener("click", () => (timeout = setTimeout(toggle, 500)));
    video.addEventListener("dblclick", dbClick);
    video.addEventListener("timeupdate", _handleProgress);
    progressWrapper.addEventListener("click", _scrub);
    progressWrapper.addEventListener("mousemove", e => mousedown && _scrub(e));
    progressWrapper.addEventListener("mousedown", () => (mousedown = true));
    progressWrapper.addEventListener("mouseup", () => (mousedown = false));
    volumeControl.addEventListener("input",_setVolumeAndSpeed );
    speedControl.addEventListener("input",_setVolumeAndSpeed);
    plusSecBtn.addEventListener("click", _plusSec);
    minusSecBtn.addEventListener("click", _minusSec);
  }

  return {
    init
  };
})();

const video = document.querySelector(".player__video");
const player1 = VideoPlayer.init(video);

  
