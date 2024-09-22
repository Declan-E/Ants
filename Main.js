var mainCanvas;
var SCREENWIDTH;
var SCREENHEIGHT;

var antsList = []; //Contains all ants for calling updateVisuals()

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
        //Iterate antsList in reverse in case an ant removes itself
        for (let i = antsList.length - 1; i > -1; i--) {
            antsList[i].updateVisuals();
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

