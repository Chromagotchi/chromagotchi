$(document).ready(function() {
    chrome.storage.sync.get("petList", function(obj) {
        if(obj===true)
        {
            petManager.setList(obj["petList"]);
            console.log("found the list: "+obj["petList"]);
        }
        else
        {
            petManager.addPet($(window).width() / 2 - 100, 1);
            ballManager.addBall(200, 400);
            bowlManager.addBowl(500, 600);
            bedManager.addBed(800, 680);
            console.log("no list, adding pet");
        }
    });

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

