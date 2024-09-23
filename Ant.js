//Base Ant class to use as a base to extend subtypes
class Ant {
    constructor(x, y, width = SCREENWIDTH * 0.01, colour = "#CCCCCC", speed = 0.1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.colour = colour;
        this.speed = speed; //Percent of the SCREENWIDTH to move per second

        //For navigation
        this.desiredX = x;
        this.desiredY = y;

        this.pheromoneDelay = 100; //Milliseconds
        this.pheromoneTimer = 0;

        this.senseDelay = 20; //Milliseconds between checking for touching pheromones
        this.senseTimer = 0;

        this.pheromonesList = []; //My pheromones

        antsList.push(this);
        this.id = antsList.length - 1; //Debug. Not unique!
    }

    updateVisuals = function(elapsed) {
        //TODO: perceive nearby ants

        this.senseTimer += elapsed;
        if (this.senseTimer >= this.senseDelay) {
            let sensedPheromone = this.sensePheromone()
            if (sensedPheromone != false) {
                //TODO: respond to pheromone
                console.log(this.id + " touched a pheromone of intensity " + sensedPheromone.intensity);
            }
        }

        this.pheromoneTimer += elapsed;
        if (this.pheromoneTimer >= this.pheromoneDelay) {
            this.dropPheromone(); //TODO: pheromone based on current senses
            this.pheromoneTimer = 0;
        }

        if (this.desiredX <= this.x + 0.01 * this.x && this.desiredX >= this.x - 0.01 * this.x && 
            this.desiredY <= this.y + 0.01 * this.y && this.desiredY >= this.y - 0.01 * this.y) {
            //Desired coords reached
            
            //Wander by default
            this.wander();
        }

        if (this.desiredX != this.x || this.desiredY != this.y) {
            //We want to move
            let distX = this.desiredX - this.x; //Distance to move E-W
            let distY = this.desiredY - this.y; //Distance to move N-S
            let totalDist = Math.sqrt(distX * distX + distY * distY);
            let pcMove = 1; //100%
            let pxToMove = this.speed * SCREENWIDTH * (elapsed / 1000);
            if (totalDist > pxToMove) {
                pcMove = pxToMove / totalDist;
            }
            distX *= pcMove;
            distY *= pcMove;
            this.x += distX;
            this.y += distY;
        }

        let ctx = mainCanvas.context;
        //Draw a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }

    //Sets desired coords to a random nearby location
    wander = function() {
        let randX = randBetween(this.x - SCREENWIDTH * 0.05, this.x + SCREENWIDTH * 0.05);
        let randY = randBetween(this.y - SCREENHEIGHT * 0.05, this.y + SCREENHEIGHT * 0.05);

        if (randX < 0) randX = 0;
        if (randX > SCREENWIDTH) randX = SCREENWIDTH;
        if (randY < 0) randY = 0;
        if (randY > SCREENHEIGHT) randY = SCREENHEIGHT;

        this.desiredX = randX;
        this.desiredY = randY;
    }

    dropPheromone = function() {
        this.pheromonesList.push(new Pheromone(this, this.x, this.y, null));
    }

    //Returns the pheromone we're touching
    sensePheromone = function() {
        //TODO: Optimise!
        //      Split screen into segments and only process what's in the same segment?
        for (let i = pheromonesList.length - 1; i > 0; i --) {
            if (pheromonesList[i].isAtCoords(this.x, this.y) &&
                pheromonesList[i].intensity < 1) { //Don't sense a pheromone we just dropped
                     return pheromonesList[i];
            }
        }
        return false;
    }

    die = function() {
        for (let i = 0; i < antsList.length; i++) {
            if (antsList[i] === this) {
                antsList.splice(i, 1);
            }
        }
    }
}

function createAnt(x, y) {
    if (x == null) x = Math.random() * SCREENWIDTH;
    if (y == null) y = Math.random() * SCREENHEIGHT;
    new Ant(x, y);
}

function createSwarm(num) {
    for (i = 0; i < num; i++) {
        createAnt();
    }
}