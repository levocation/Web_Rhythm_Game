class Game {
    constructor() {

        this.noteManager = new NoteManager(4);
        this.isPressed = new Map();

        for (let i = 1; i <= this.noteManager.getKey_count(); i++) {
            this.isPressed.set('KEY_' + String(i), false);
        }

        this.note_line_image = new Image();
        this.note_line_image.src = 'img/note_line.png';

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth - 1400;
        this.canvas.height = window.innerHeight - 150;

        this.NOTE_LINE_WIDTH = this.canvas.width / 4;
        this.NOTE_LINE_HEIGHT = this.canvas.height;

        // function binding
        this.start = this.start.bind(this);
        this.start_game_animation_frame 
        = this.start_game_animation_frame.bind(this);

        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    start() {
        
        this.noteManager.add(new Note(), 1);
        this.noteManager.add(new Note(), 2);
        this.noteManager.add(new Note(), 3);
        this.noteManager.add(new Note(), 4);

        let music = new Music('M2U - Masquerade');
        //music.play();
        
        
        //let intervalId = setInterval(this.start_game_animation_frame, 1000 / 60);
        this.start_game_animation_frame();
        
    }
    
    drawJudgeLine() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 10);
    }

    start_game_animation_frame() {
        requestAnimationFrame(this.start_game_animation_frame);

        // --- CLEAR CANVAS ---
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // --- DRAW NOTE LINE ---
        if (this.isPressed.get('KEY_1')) {
            this.ctx.drawImage(
                this.note_line_image, 
                0, 0,
                this.NOTE_LINE_WIDTH, this.NOTE_LINE_HEIGHT);
        }
        if (this.isPressed.get('KEY_2')) {
            this.ctx.drawImage(
                this.note_line_image, 
                this.NOTE_LINE_WIDTH, 0,
                this.NOTE_LINE_WIDTH, this.NOTE_LINE_HEIGHT);
        }
        if (this.isPressed.get('KEY_3')) {
            this.ctx.drawImage(
                this.note_line_image, 
                this.NOTE_LINE_WIDTH * 2, 0,
                this.NOTE_LINE_WIDTH, this.NOTE_LINE_HEIGHT);
        }
        if (this.isPressed.get('KEY_4')) {
            this.ctx.drawImage(
                this.note_line_image, 
                this.NOTE_LINE_WIDTH * 3, 0,
                this.NOTE_LINE_WIDTH, this.NOTE_LINE_HEIGHT);
        }

        
        // --- DRAW JUDGE LINE ---
        this.drawJudgeLine();

        // --- DRAW NOTE ---
        this.noteManager.draw(5);
    }

    handleKeyDown(event) {
        if (event.key === 'd' || event.key === 'D') {
            this.isPressed.set('KEY_1', true);
            this.noteManager.remove(1);
        }
        if (event.key === 'f' || event.key === 'F') {
            this.isPressed.set('KEY_2', true);
        }
        if (event.key === 'j' || event.key === 'J') {
            this.isPressed.set('KEY_3', true);
        }
        if (event.key === 'k' || event.key === 'K') {
            this.isPressed.set('KEY_4', true);
        }
    }

    handleKeyUp(event) {
        if (event.key === 'd' || event.key === 'D') {
            this.isPressed.set('KEY_1', false);
        }
        if (event.key === 'f' || event.key === 'F') {
            this.isPressed.set('KEY_2', false);
        }
        if (event.key === 'j' || event.key === 'J') {
            this.isPressed.set('KEY_3', false);
        }
        if (event.key === 'k' || event.key === 'K') {
            this.isPressed.set('KEY_4', false);
        }
    }
}