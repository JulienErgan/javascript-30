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
    })
    // to handle error if video is not allowed
    .catch(err => {
      console.error(`OH NOOO!`, err);
    });
}


function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // console.log(width, height); // size of the video coming out from the webcam
  // but need to make sure that the canvas is the same size before we paint to it
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}


function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  console.log(data); // if take a photo in the browser, in the console it returns
  // something called Base64 which is a text-based representation of the photo
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  // link.textContent = 'Download Image'; // instead of this:
  link.innerHTML = `<img src="${data}" alt="Handsome man" />`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();


video.addEventListener('canplay', paintToCanvas);
