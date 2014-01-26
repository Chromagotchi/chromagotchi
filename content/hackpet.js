$(document).ready(function() {
    
    petManager.addPet($(window).width() / 2 - 100, 1);

    window.khNodes = new StickyNodes();

    var i, len, el;
    window.khNodes.addWords(document.body);
    for (i = 0, len = document.body.childNodes.length; i < len; i++) {
        el = document.body.childNodes[i];
        window.khNodes.addTagNames(el, [
            'button', 'canvas', 'iframe', 'img', 'input', 'select',
            'textarea'
        ]);
    }

    window.khNodes.finalize($(document).width(), $(document).height());

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            // alert(sender.tab ? "from a content script:" + 
            // sender.tab.url : "from the extension");
            console.log("MESSAGE RECEIVED");
            if (request.signal == "color") {
                // alert('setting color to ' + request.value);
                // $(square).css('background-color', request.value);
                // sendResponse({farewell: "goodbye"});
                petManager.updatePetColors(request.value);
            }
            else if (request.signal == "food") {
                console.log("FOOD SIGNAL RECEIVED, MAKING FOOD");
                bowlManager.addBowl(500,600);
            }
            else if (request.signal == "ball") {
                console.log("BALL SIGNAL RECEIVED, MAKING BALL");
                ballManager.addBall(200,400);
            }
            else if(request.signal == "bed") {
                console.log("BED SIGNAL RECEIVED, MAKING BED");
                bedManager.addBed(800,600);
            }
        }
    );

    var mainloop = function() {
        petManager.update();
        ballManager.update(petManager.getList());
        bowlManager.update(petManager.getList());
        bedManager.update(petManager.getList());
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
    petManager.startNeedsSystem();
    animFrame( recursiveAnim );
    console.log("post frame");
});

