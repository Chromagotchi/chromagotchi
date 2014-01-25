// Init code

MovementState = {
    LEFT : 0,
    RIGHT : 1,
    STOP : 2
}

var currentState = MovementState.STOP;

$(document).ready(function() {
    var square = $(document.createElement("div"));
    square.addClass("pet");

    $("body").append(square);

    $(square).click(function() {
        $(square).css('background-color', 'blue');
    });

    var xPos = 400;
    var MOVE_SPEED = 1;
    var mainloop = function() {
        switch(currentState)
        {
            case MovementState.LEFT:
                xPos -= MOVE_SPEED;
                break;
            case MovementState.RIGHT:
                xPos += MOVE_SPEED;
                break;
            default:
                //don't move
        }
        $(square).css("left", xPos + "px");
    };

    var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

    var recursiveAnim = function() {
        mainloop();
        animFrame( recursiveAnim );
    };

    // start the mainloop
    animFrame( recursiveAnim );
    console.log("post frame");
    resetMoveTime();
});

function resetMoveTime() {
    var randTime = (Math.random()*2 + 2)*1000;
    console.log("randTime: "+randTime);
    window.setTimeout(function() {
        var randNum = Math.random();
        console.log("randNum: "+randNum);
        if(randNum < 0.33)
        {
            currentState = MovementState.LEFT;
        }
        else if(randNum < 0.66)
        {
            currentState = MovementState.RIGHT;
        }
        else
        {
            currentState = MovementState.STOP;
        }
        resetMoveTime();
    }, randTime);
}
//
