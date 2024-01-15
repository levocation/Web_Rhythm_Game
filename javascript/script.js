let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let isPressed = {
    KEY_A: false,
    KEY_S: false,
    KEY_D: false,
    KEY_F: false
}

canvas.width = window.innerWidth - 1000;
canvas.height = window.innerHeight - 50;

const NOTE_LINE_WIDTH = canvas.width / 4;
const NOTE_LINE_HEIGHT = canvas.height;

ctx.fiilStyle = 'green';

let note_line_image = new Image();
note_line_image.src = 'img/note_line.png';

class Note {
    
    constructor() {
        this.noteImage = new Image();
        this.noteImage.src = 'img/note.png';
        this.x = 0;
        this.y = 0;
    }

    draw() {
        ctx.drawImage(this.noteImage, this.x, this.y);
    }

    moveDown() {
        this.y++;
    }
}

class NoteManager {

    constructor() {
        this.notes = [];
    }

    add(note) {
        this.notes.push(note);
    }

    remove(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
    }
}

NoteManager = new NoteManager();

function start_game_animation_frame() {
    requestAnimationFrame(start_game_animation_frame);

    // --- CLEAR CANVAS ---
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- MOVE NOTE ---


    // --- DRAW NOTE LINE ---
    if (isPressed.KEY_A) {
        ctx.drawImage(note_line_image, 0, 0, 
            NOTE_LINE_WIDTH, NOTE_LINE_HEIGHT);
    }
    if (isPressed.KEY_S) {
        ctx.drawImage(note_line_image, NOTE_LINE_WIDTH, 0, 
            NOTE_LINE_WIDTH, NOTE_LINE_HEIGHT);
    }
    if (isPressed.KEY_D) {
        ctx.drawImage(note_line_image, NOTE_LINE_WIDTH * 2, 0, 
            NOTE_LINE_WIDTH, NOTE_LINE_HEIGHT);
    }
    if (isPressed.KEY_F) {
        ctx.drawImage(note_line_image, NOTE_LINE_WIDTH * 3, 0, 
            NOTE_LINE_WIDTH, NOTE_LINE_HEIGHT);
    }

    // --- DRAW NOTE ---
    
}

start_game_animation_frame();

// keyListener

window.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'A') {
        isPressed.KEY_A = true;
    }
    if (event.key === 's' || event.key === 'S') {
        isPressed.KEY_S = true;
    }
    if (event.key === 'd' || event.key === 'D') {
        isPressed.KEY_D = true;
    }
    if (event.key === 'f' || event.key === 'F') {
        isPressed.KEY_F = true;
    }
});

window.addEventListener('keyup', function(event) {
    if (event.key === 'a' || event.key === 'A') {
        isPressed.KEY_A = false;
    }
    if (event.key === 's' || event.key === 'S') {
        isPressed.KEY_S = false;
    }
    if (event.key === 'd' || event.key === 'D') {
        isPressed.KEY_D = false;
    }
    if (event.key === 'f' || event.key === 'F') {
        isPressed.KEY_F = false;
    }
});
