class NoteManager {

    constructor(line, game_delay, judge_line_yPos, note_speed) {
        this.note_queue = [];
        for (let i = 0; i < line; i++) {
            this.note_queue.push([]);
        }

        this.game_delay = -game_delay + (judge_line_yPos / 60);
        console.log(this.game_delay);
        this.time_count = this.game_delay;
        this.judge_line_yPos = judge_line_yPos;
        console.log("judge_line_yPos : " + this.judge_line_yPos);
        this.speed = note_speed;

        this.key_count = line;

        this.time_tick = 0;
        // 노트가 기본적으로 가지는 딜레이

        this.NOTE_LINE_WIDTH = (window.innerWidth - 1400) / 4;
        this.NOTE_LINE_HEIGHT = (window.innerHeight - 150);
    }

    timeCount() {
        this.time_count++;
        //console.log(this.time_count);
    }

    getKey_count() {
        return this.key_count;
    }

    add(note, index, time) {
        if (index === undefined) {
            console.error('NoteManager.add: idx is undefined');
        }
        else if (index < 1 || index > 4) {
            console.error('NoteManager.add: idx is out of range');
        }
        else {
            note.x = 
            (index - 1) * this.NOTE_LINE_WIDTH 
            + (this.NOTE_LINE_WIDTH / 8);
            note.y = -(this.judge_line_yPos * (this.speed - 1));
            console.log("note.y : " + note.y);
            this.time_tick += time;
            note.time = this.time_tick;
            note.judge_line_yPos = this.judge_line_yPos;
            this.note_queue[index - 1].push(note);
        }
    }

    top(idx) {
        this.note_queue[idx - 1].shift();
    }

    /** 인자는 노트의 스피드. 기본값은 1 */
    draw() {
        for (let i = 0; i < this.note_queue.length; i++) {
            for (let j = 0; j < this.note_queue[i].length; j++) {
                let note = this.note_queue[i][j];
                if (note !== undefined 
                    && note.time <= this.time_count) {
                    note.draw();
                    note.moveDown(this.speed);
                }

                // 맨 앞에 있는 노트가 판정선을 넘어가면 사라지게 하기
                if (note !== undefined 
                    && j == 0
                    && note.y > this.judge_line_yPos) {
                        this.note_queue[i].shift();
                        j--;
                }
            }
        }
    }

    judge(idx) {
        if (this.note_queue[idx - 1].length === 0) {
            return false;
        }
        let note = this.note_queue[idx - 1][0];
        if (note.y >= this.judge_line_yPos - 300 
            && note.y <= this.judge_line_yPos + 50) {
            this.note_queue[idx - 1].shift();
            return true;
        } else {
            return false;
        }
    }
}