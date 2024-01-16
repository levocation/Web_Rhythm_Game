class NoteManager {

    constructor(line) {
        this.note_queue = [];
        for (let i = 0; i < line; i++) {
            this.note_queue.push(new Queue());
        }

        this.time_count = 0;

        this.key_count = line;

        this.NOTE_LINE_WIDTH = (window.innerWidth - 1400) / 4;
        this.NOTE_LINE_HEIGHT = (window.innerHeight - 150);
    }

    timeCount() {
        this.time_count++;
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
            note.x = (index - 1) * this.NOTE_LINE_WIDTH + (this.NOTE_LINE_WIDTH / 8);
            note.time = time;
            this.note_queue[index - 1].push(note);
        }
    }

    remove(idx) {
        this.note_queue[idx - 1].pop();
    }

    draw(speed) {
        for (let i = 0; i < this.note_queue.length; i++) {
            let note = this.note_queue[i].front();
            if (note !== undefined) {
                note.moveDown(speed);
                note.draw();
            }
        }
    }
}