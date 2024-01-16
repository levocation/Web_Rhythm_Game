"use strict";

let canvas = document.getElementById('canvas');
let ctx = this.canvas.getContext('2d');
canvas.width = window.innerWidth - 1000;
canvas.height = window.innerHeight - 150;

// Draw button
function drawButton() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 25, 100, 50);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Click Me', canvas.width / 2 - 38, canvas.height / 2 + 8);
}

let isGameStart = false;

// Create Game instance on button click
canvas.addEventListener('click', function (e) {
    // if click color is blue, start game
    if (e.offsetX >= canvas.width / 2 - 50 && e.offsetX <= canvas.width / 2 + 50 &&
        e.offsetY >= canvas.height / 2 - 25 && e.offsetY <= canvas.height / 2 + 25) {
        if (!isGameStart) {
            isGameStart = true;
            let game = new Game();
            game.start();
        }
    }
});

drawButton();