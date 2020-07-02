// Get out Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
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


function skip() {
  // console.log('skipping');
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

// Did not understand this one
function handleRangeUpdate(){
  video[this.name] = this.value
  // this.name is either equal to 'volume' or 'playbackRate'
  // console.log(this.name);
  // console.log(this.value);
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
// whenever click the video, it will trigger a 'play' or 'pause' event, which
// will in turn run our updateButton function
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
