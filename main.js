const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.75;

const collcanvas = document.getElementById('collcanvas');
const collcontext = collcanvas.getContext('2d');
collcanvas.width = window.innerWidth;
collcanvas.height = window.innerHeight * 0.75;

const bird = new Bird();
let lasttime = 0;
let timetonextbird = 0;
let birdgap = 1500;
let birds = [];
let bombs = [];
let birddrop = [];
let score = 0;
let gameend = false;
context.font = '40px Impact';
let blstart = false;
let gameaudio = new Audio('background.mp3');

function animate(timestamp) {
    collcontext.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    let timedifference = timestamp - lasttime;
    lasttime = timestamp;
    timetonextbird += timedifference;
    if (timetonextbird > birdgap) {
        birds.push(new Bird());
        timetonextbird = 0;
        birds.sort(function (a, b) {
            return a.width - b.width;
        })
    }
    [...birds, ...bombs, ...birddrop].forEach(object => object.update(timedifference));
    [...birds, ...bombs, ...birddrop].forEach(object => object.draw());
    birds = birds.filter(object => !object.deleteentity);
    bombs = bombs.filter(object => !object.deleteentity);
    birddrop = birddrop.filter(object => !object.deleteentity);
    if (!gameend) requestAnimationFrame(animate);
    else drawgameend();

}

window.addEventListener('click', function (e) {
    if (blstart) {
        sound= new Audio();
        sound.src='shot.wav';
        sound.play();
        const detectpixelcolor = collcontext.getImageData(e.x, e.y, 1, 1);
        const pixelcolor = detectpixelcolor.data;
        birds.forEach(object => {
            if (object.randomColors[0] === pixelcolor[0] && object.randomColors[1] === pixelcolor[1]
                && object.randomColors[2] === pixelcolor[2]
            ) {
                score++;
                scorecount.innerHTML = score;
                object.deleteentity = true;
                bombs.push(new Bomb(object.x, object.y, object.width));
                birddrop.push(new Birddrop(object.x, object.y, object.width));
                showdoghappy();
            }
        });
    }

});
function drawgameend() {
    context.textAlign = 'center';
    context.fillStyle = 'black';
    context.fillText('Гру скінчено: Ваш рахунок ' + score, canvas.width / 2, 100);
    showdogsad();
    gameaudio.pause();
}
function showdoghappy() {
    dog.classList.add('dog');
    document.getElementById("dog").style.backgroundImage = ' url(img/happydog.png)';
    document.getElementById("dog").style.animation = 'dogup linear .5s 1';
    setTimeout(() => {
        document.getElementById("dog").style.animation = 'dogdown linear .5s 1';
    }, 1000);
    setTimeout(() => {
        dog.classList.remove('dog');
    }, 1501);
}
function showdogsad() {
    dog.classList.add('dog');
    document.getElementById("dog").style.backgroundImage = ' url(img/saddog.png)';
    document.getElementById("dog").style.animation = 'dogup linear .5s 1';
    document.getElementById("btnstart").style.display = 'inline';
    blstart = false;
    score = 0;
}
function startgame() {
    gameaudio.play();
    gameaudio.loop = true;
    timetonextbird = 0;
    birdgap = 1500;
    lasttime = 0;
    birds = [];
    bombs = [];
    birddrop = [];
    gameend = false;
    blstart = true;
    animate(0);
    document.getElementById("btnstart").style.display = 'none';
    setTimeout(() => {
        document.getElementById("dog").style.animation = 'dogdown linear .5s 1';
    }, 1000);
    setTimeout(() => {
        dog.classList.remove('dog');
    }, 1501);
}