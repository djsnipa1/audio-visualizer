var AudioContext =
    window.AudioContext || // Default
    window.webkitAudioContext || // Safari and old versions of Chrome
    false;

if (AudioContext) {
    // Do whatever you want using the Web Audio API
    var audioCtx = new AudioContext();
    // ...
} else {
    // Web Audio API is not supported
    // Alert the user
    alert(
        'Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox'
    );
}

//const audioCtx = new AudioContext();
console.log(audioCtx);

const container = document.getElementById('container');

const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const file = document.getElementById('fileupload');
let audioSource;
let analyser;

container.addEventListener('click', function () {
    const audio1 = document.getElementById('audio1');
    // a file that is easy to automatically play a file without loading a new one
    audio1.src = 'psysounds/psy_sound2.wav';

    const audioCtx = new AudioContext();
    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x;

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        requestAnimationFrame(animate);
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
    }
    animate();
});

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.5;
        const red = i * barHeight / 20;
        const green = i * 4;
        const blue = barHeight / 2;
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}

file.addEventListener('change', function () {
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
});