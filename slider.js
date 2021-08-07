var mouseDown = false;

var worklet = document.querySelector('.worklet-canvas');

var barSeed = document.getElementById('bar-seed');
var barNumpoints = document.getElementById('bar-numpoints');
var barVariance = document.getElementById('bar-variance');
var barSmooth = document.getElementById('bar-smoothness');

var hitboxSeed = document.getElementById('hitbox-seed');
var hitboxNumpoints = document.getElementById('hitbox-numpoints');
var hitboxVariance = document.getElementById('hitbox-variance');
var hitboxSmooth = document.getElementById('hitbox-smoothness');


// console.log(hitboxVariance);

function moveSlider(e) {
  if (!mouseDown) return;
  // console.log(e.target)
  e.target.querySelector('.slider-fg').style.width = e.offsetX + "px";
  if (e.target == hitboxSeed) {
    worklet.style.setProperty("--blob-seed", e.offsetX);
    return
  }
  if (e.target == hitboxNumpoints) {
    worklet.style.setProperty("--blob-num-points", Math.floor(3.5 + e.offsetX / 16));
    return
  }
  if (e.target == hitboxVariance) {
    worklet.style.setProperty("--blob-variance", -20 + e.offsetX / 16);
    return
  }
  if (e.target == hitboxSmooth) {
    worklet.style.setProperty("--blob-smoothness", -20 + e.offsetX / 16);
    return
  }
}

var boxes = Array.from(document.querySelectorAll('.slider-hitbox'));
boxes.forEach(box => {
  box.addEventListener('mousemove', moveSlider);
  box.addEventListener('mousedown', function() {
    mouseDown = true
    document.body.classList.add('no-select');
  });
  box.addEventListener('click', function(e) {
    mouseDown = true;
    moveSlider(e);
    mouseDown = false;
  });
})

document.addEventListener('mouseup', function() {
  mouseDown = false;
  document.body.classList.remove('no-select');
});



// audio controlling these parameters
var currentAudio = document.getElementById('audio1');
var timer = document.getElementById('timer');

function onTimeUpdate() {
  var t = this.currentAudio.currentTime

  // timer.innerHTML = this.getMinutes(t);
  timer.innerText = this.getMinutes(t);
  this.animateSlider(barSeed);

}


function getMinutes(t) {
  var min = parseInt(parseInt(t)/60);
  var sec = parseInt(t%60);
  if (sec < 10) {
    sec = "0"+sec
  }
  if (min < 10) {
    min = "0"+min
  }
  return min+":"+sec
}

function animateSlider(slider) {
  var progress = (this.currentAudio.currentTime/this.currentAudio.duration)*100;
  // console.log(progress);
  slider.style.width = progress + "%";
  worklet.style.setProperty("--blob-seed", progress * 10);
  // document.getElementById('myBarCircle').style.left = progress + "%";
}