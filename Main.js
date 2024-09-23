var mainCanvas;
var SCREENWIDTH;
var SCREENHEIGHT;

//Lists of all objects for calling updateVisuals()
var antsList = [];
var pheromonesList = []; 

var lastFrameTimeStamp = window.performance.now(); //Run time for animation frames

function initMain() {
    sizeCanvas();
    mainCanvas = new MainCanvas();

    window.addEventListener("resize", sizeCanvas);

    advanceFrame(); //Start drawing frames
}

//Called each frame; main loop
function advanceFrame(timeStamp) {
    if (timeStamp == undefined) {
        timeStamp = lastFrameTimeStamp;
    }
    var elapsed = timeStamp - lastFrameTimeStamp;
    if (elapsed > 50) elapsed = 50; //In case of tab out, etc. when elapsed time is high

    if (lastFrameTimeStamp != timeStamp) {
        mainCanvas.updateVisuals(elapsed);
        //Iterate lists in reverse in case an object removes itself
        
        for (let i = pheromonesList.length - 1; i > -1; i--) {
            pheromonesList[i].updateVisuals(elapsed);
        }
        
        for (let i = antsList.length - 1; i > -1; i--) {
            antsList[i].updateVisuals(elapsed);
        }
   }

   lastFrameTimeStamp = timeStamp;

   //Recursive call
   requestAnimationFrame(advanceFrame);
}

function sizeCanvas()   {
    SCREENWIDTH = Math.round(window.innerWidth);

    if (SCREENWIDTH < 750) SCREENWIDTH = 750;

    SCREENHEIGHT = SCREENWIDTH * 0.5625; //16:9
}

//Generate a random number within a given range
function randBetween(min, max, integer) {
    max = max + 0.999999999999999; //Max js decimals
    //To avoid rounding favouring the min and max numbers least, use Math.trunc
//So max needs to be max + (just under 1) to truncate the int above max
	if (integer) return Math.trunc(Math.random() * (max - min) + min);
	return Math.random() * (max - min) + min;
}

