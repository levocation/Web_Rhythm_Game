class Note {

    constructor() {
        this.noteImage = new Image();
        this.noteImage.src = 'img/note.png';
        this.x = 0;
        this.y = 0;
        this.time = 0;
        this.default_speed = 0;
        this.judge_line_yPos = 0;
        
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /** {x: xPos, y: yPos} 형태로 반환 */
    get pos() {
        return {
            x: this.x,
            y: this.y
        }
    }

    set pos(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    draw() {
        this.ctx.drawImage(this.noteImage, this.x, this.y);
    }

    moveDown(speed) {
        this.y += (this.judge_line_yPos / 60) * speed;
    }
}