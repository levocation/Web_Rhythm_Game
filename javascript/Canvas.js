class Canvas {
    constructor(width, height) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        this.width = width;
        this.height = height;
    }
}