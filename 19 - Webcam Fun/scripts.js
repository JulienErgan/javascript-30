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
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels);
    // debugger;

    // mess with the pixels
    // pixels = redEffect(pixels);

    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;

    // pixels = greenScreen(pixels);

    // put the pixels back
    ctx.putImageData(pixels, 0, 0);
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

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) { // pixels.data is the array
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // red from rgba
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) { // pixels.data is the array
    pixels.data[i -150] = pixels.data[i + 0]; // red from rgba
    pixels.data[i + 500] = pixels.data[i + 1]; // green
    pixels.data[i - 550] = pixels.data[i + 2]; // blue
  }
  return pixels;
}

function greenScreen(pixels) {
  // all copied and pasted from the solution like Wes Bos did
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  console.log(levels);

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo();


video.addEventListener('canplay', paintToCanvas);
