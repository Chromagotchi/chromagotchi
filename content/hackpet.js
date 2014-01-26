function generatePet(petManager) {
    var center = $(window).width() / 2;
    petManager.addPet(center, 1);
}

$(document).ready(function() {

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            console.log("we are returning the second petmanager ");
            if (request.signal == "newPet") {
                generatePet(request.petManager);
            }
            else if (request.signal == "color") {
                request.petManager.updatePetColors(request.value);
            }
            else if (request.signal == "petManager") {
                sendResponse({petManager: petManager});
            }
            //else if (request.signal == "petManager") {
            //    console.log('contxt side pet manager');
            //    sendResponse({petManager: petManager});
            //}
        }
    );

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

