//Ants can drop pheromones to pass information
class Pheromone {
    constructor(ant, x, y, message, size = SCREENWIDTH * 0.01, intensity = 1, fadeRate = 20) {
        this.ant = ant;
        this.x = x;
        this.y = y;
        this.message = message;
        this.colour = this.getColourFromMessage(); 
        this.size = size;
        this.intensity = intensity; //How strong the signal is to start
        this.fadeRate = fadeRate; //How fast the signal fades (% per second)

        //Linked list of pheromones
        this.prev = null;
        if (this.ant.pheromonesList.length > 0) {
            this.prev = this.ant.pheromonesList[this.ant.pheromonesList.length - 1];
            this.prev.next = this;
        }
        this.next = null;

        pheromonesList.push(this);
    }

    updateVisuals = function(elapsed) {
        if (this.intensity <= 0) {
            this.fadeOut();
            return;
        }

        var ctx = mainCanvas.context;
        ctx.globalAlpha = this.intensity;

        //Draw a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();

        ctx.globalAlpha = 1;

        //Fade
        this.intensity -= this.fadeRate / 100 * (elapsed / 1000);
        this.size -= this.size * (this.fadeRate / 100 * (elapsed / 1000)); //Shrink slightly too
    }

    getColourFromMessage = function() {
        switch (this.message) {
            //Add colours here per message
            default :
                return "#666666";
        }
    }

    //Scent gone. Remove from lists
    fadeOut = function() {
        for (let i = 0; i < pheromonesList.length; i ++) {
            if (pheromonesList[i] === this) {
                pheromonesList.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < this.ant.pheromonesList.length; i ++) {
            if (this.ant.pheromonesList[i] === this) {
                this.ant.pheromonesList.splice(i, 1);
                break;
            }
        }
    }

    isAtCoords(x, y) {
        if (x > this.x - this.size / 2 && x < this.x + this.size / 2 &&
            y > this.y - this.size / 2 && y > this.y + this.size / 2) {
                return true;
        }
        return false;
    }
}