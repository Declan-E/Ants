//Base Ant class to use as a base to extend subtypes
class Ant {
    constructor(x, y, width = SCREENWIDTH * 0.01, colour = "#CCCCCC") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.colour = colour;

        antsList.push(this);
    }

    updateVisuals = function(elapsed) {
        //TODO: perceive nearby ants
        //TODO: move based on elapsed and intended movement
        //TODO: drop pheromone based on current position

        let ctx = mainCanvas.context;
        //Draw a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }

    die = function() {
        for (let i = 0; i < antsList.length; i++) {
            if (antsList[i] === this) {
                antsList.splice(i, 1);
            }
        }
    }
}

//For testing
function createTestAnt() {
    new Ant(Math.random() * SCREENWIDTH, Math.random() * SCREENHEIGHT);
}