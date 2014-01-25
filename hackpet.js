$(document).ready(function() {
    var square = $(document.createElement("div"));
    square.addClass("pet");

    $("body").append(square);

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            // alert(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
            if (request.signal == "color") {
                // alert('setting color to ' + request.value);
                $(square).css('background-color', request.value);
                // sendResponse({farewell: "goodbye"});
            }
        }
    );

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

    $(square).click(function() {
        $(square).css('background-color', 'blue');
    });
});


