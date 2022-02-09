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
//audio1.src = 'psysounds/psy_sound2.wav';

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
    const audioCtx = new AudioContext();
    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64;
    const bufferLegnth = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLegnth);

    const barWidth = canvas.width / bufferLegnth;
    let barHeight;
    let x;

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLegnth; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = 'white';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
        requestAnimationFrame(animate);
    }
    animate();

});

file.addEventListener('change', function () {
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
});