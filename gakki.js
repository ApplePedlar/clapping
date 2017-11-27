var context;
var gakkiBuffer = [];

function init() {
  console.log("onload");
  loadSound("./wav/ding.wav", 0);
  loadSound("./wav/clap.wav", 1);
  loadSound("./wav/kasta.wav", 2);
  loadSound("./wav/tanba.wav", 3);
}

function loadSound(url, index) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    if (!context) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      context.createBufferSource().start(0);
    }
    context.decodeAudioData(request.response, function(buffer) {
      gakkiBuffer[index] = buffer;
    }, function(err) {
      console.log(err);
    });
  }
  request.send();
}

function play() {
  var tempo = document.getElementById("tempo").value;
  var partValue = document.getElementById("part").part.value;
  console.log(partValue);
  var startTime = context.currentTime + 0.100;
  for (var i = 0; i < notes[0].length; i++) {
    for (var j = 0; j < 4; j++) {
      if (notes[j].charAt(i) === "1" && partValue.indexOf("" + j) !== -1) {
        playSound(j, startTime + i * 60 / tempo / 3);
      }
    }
  }
}

function playSound(gakkiIndex, time) {
  var source = context.createBufferSource();
  source.buffer = gakkiBuffer[gakkiIndex];
  source.connect(context.destination);
  source.start(time);
}

function stopSound() {
  
}

window.onload = init;
