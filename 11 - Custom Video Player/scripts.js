// Get out Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// Build out functions

function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
// alternative syntax
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
// OR even refactore to:
  // video[video.paused ? 'play' : 'pause']();

// instead of hooking to the togglePlay function, want to listen to video for whenver it is paused
// so whatever causes the video to pause, we update the button
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  // console.log(icon);
  // refactored it would be - toggle.textContent = this.paused ? '►' : '❚ ❚';
  // console.log('Update the button');
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
// whenever click the video, it will trigger a 'play' or 'pause' event, which
// will in turn run our updateButton function
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
