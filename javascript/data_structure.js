class Queue {
    constructor() {
        this.queue = [];

    }

    get(idx) {
        return this.queue[idx];
    }

    push(element) {
        this.queue.push(element);
    }

    pop() {
        return this.queue.shift();
    }

    front() {
        return this.queue[0];
    }

    empty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }

    clear() {
        this.queue = [];
    }
}