$(document).ready(function() {
    petManager.addPet(500, 1);
//    petManager.addPet(800, 2);

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            // alert(sender.tab ? "from a content script:" + 
            // sender.tab.url : "from the extension");
            if (request.signal == "color") {
                // alert('setting color to ' + request.value);
                // $(square).css('background-color', request.value);
                // sendResponse({farewell: "goodbye"});
                petManager.updatePetColors(request.value);
            }
        }
    );

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


