class Game {
    constructor() {

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth - 1400;
        this.canvas.height = window.innerHeight - 150;

        this.game_delay = Math.floor(2000 / 60);
        // test value
        
        this.music = new Music('M2U - Masquerade');

        this.noteManager = 
        new NoteManager(
            /*line =*/ 4, 
            /*game_delay =*/ this.game_delay,
            /*judge_line_yPos =*/ (this.canvas.height - 100),
            1.7
            );
        this.isPressed = new Map();

        this.isKeyUp = new Map();
        this.isHitNote = new Map();


        for (let i = 1; i <= this.noteManager.getKey_count(); i++) {
            this.isPressed.set('KEY_' + String(i), false);
            this.isKeyUp.set('KEY_' + String(i), true);
            this.isHitNote.set('KEY_' + String(i), false);
        }

        this.note_line_image = new Image();
        this.note_line_image.src = 'img/note_line.png';

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
        let tempo = 7;
        this.noteManager.add(1, 0);
        this.noteManager.add(2,tempo * 8);
        this.noteManager.add(3,tempo * 8);
        this.noteManager.add(4,tempo * 8);
        this.noteManager.add([1, 3], tempo * 8);
        this.noteManager.add([2, 3], tempo * 8);
        this.noteManager.add([2, 4], tempo * 8);
        this.noteManager.add([1, 3], tempo * 8);
        this.noteManager.add(2, tempo);
        this.noteManager.add([1, 3], tempo);
        this.noteManager.add(2, tempo);
        this.noteManager.add(1, tempo);
        this.noteManager.add([3, 4], tempo);
        this.noteManager.add([2, 4], tempo);
        this.noteManager.add([1, 4], tempo);


        setTimeout(() => {
            this.music.play();
        }, this.game_delay + ((this.canvas.height - 100) / 60));
        
        
        this.start_game_animation_frame();
        
    }

    add_timeCount() {
        this.noteManager.timeCount();
    }
    
    drawJudgeLine() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 10);
    }

    start_game_animation_frame() {
        requestAnimationFrame(this.start_game_animation_frame);

        //document.getElementById('time').innerHTML = this.noteManager.time_count;

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
        this.noteManager.draw(1);

        this.add_timeCount();
    }

    handleKeyDown(event) {
        if (event.key === 'd' || event.key === 'D') {
            this.isPressed.set('KEY_1', true);
            this.isKeyUp.set('KEY_1', false);

            if (this.isHitNote.get('KEY_1') === false) {
                this.noteManager.judge(1);
                this.isHitNote.set('KEY_1', true);
            }
        }
        if (event.key === 'f' || event.key === 'F') {
            this.isPressed.set('KEY_2', true);
            this.isKeyUp.set('KEY_2', false);

            if (this.isHitNote.get('KEY_2') === false) {
                this.noteManager.judge(2);
                this.isHitNote.set('KEY_2', true);
            }
        }
        if (event.key === 'j' || event.key === 'J') {
            this.isPressed.set('KEY_3', true);
            this.isKeyUp.set('KEY_3', false);

            if (this.isHitNote.get('KEY_3') === false) {
                this.noteManager.judge(3);
                this.isHitNote.set('KEY_3', true);
            }
        }
        if (event.key === 'k' || event.key === 'K') {
            this.isPressed.set('KEY_4', true);
            this.isKeyUp.set('KEY_4', false);

            if (this.isHitNote.get('KEY_4') === false) {
                this.noteManager.judge(4);
                this.isHitNote.set('KEY_4', true);
            }
        }
    }

    handleKeyUp(event) {
        if (event.key === 'd' || event.key === 'D') {
            this.isPressed.set('KEY_1', false);
            this.isKeyUp.set('KEY_1', true);
            this.isHitNote.set('KEY_1', false);
        }
        if (event.key === 'f' || event.key === 'F') {
            this.isPressed.set('KEY_2', false);
            this.isKeyUp.set('KEY_2', true);
            this.isHitNote.set('KEY_2', false);
        }
        if (event.key === 'j' || event.key === 'J') {
            this.isPressed.set('KEY_3', false);
            this.isKeyUp.set('KEY_3', true);
            this.isHitNote.set('KEY_3', false);
        }
        if (event.key === 'k' || event.key === 'K') {
            this.isPressed.set('KEY_4', false);
            this.isKeyUp.set('KEY_4', true);
            this.isHitNote.set('KEY_4', false);
        }
    }
}