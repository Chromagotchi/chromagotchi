// Init code
$(document).ready(function() {
    var square = $(document.createElement("div"));
    square.addClass("pet");

    $("body").append(square);

    $(square).click(function() {
        $(square).css('background-color', 'blue');
    });


    var xPos = 0;
    var mainloop = function() {
        xPos += 5;
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
});

//
