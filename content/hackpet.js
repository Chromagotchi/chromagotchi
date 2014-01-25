// Init code

$(document).ready(function() {
    petManager.addPet(500, 1);
    petManager.addPet(800, 2);

    var mainloop = function() {
        petManager.update();
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
});

//
