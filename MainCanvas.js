class MainCanvas {
    constructor() {
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.width = SCREENWIDTH;
        this.canvas.height = SCREENHEIGHT;
        this.context = this.canvas.getContext("2d");
    }

    updateVisuals = function(elapsed) {
        //Called each frame

        //Erase last frame
        //mainCanvas.context.clearRect(0, 0, mainCanvas.canvas.width, mainCanvas.canvas.height);
    }
}