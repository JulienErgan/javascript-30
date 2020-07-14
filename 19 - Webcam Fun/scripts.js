const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d'); // see video on canvas
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false}) // return a Promise
    .then(localMediaStream => {
      console.log(localMediaStream);

      // DEPRECATED - see scripts-FINISHED.js
      // video.src = localMediaStream; // this is an object. For a
      // video (as a live video feed) to work it needs to be converted into some sort of URL
      // video.src = window.URL.createObjectURL(localMediaStream);
      // video.play();

      video.srcObject = localMediaStream;
      video.play();
    });
    // to handle error if video is not allowed
    .catch(err => {
      console.error('OH NOOO!', err);
    });
}

getVideo();
