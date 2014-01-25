$(document).ready(function() {
    
    chrome.storage.sync.get("petList", function(obj) {
        if(obj===true)
        {
            petManager.setList(obj["petList"]);
            console.log("found the list: "+obj["petList"]);
        }
        else
        {
            petManager.addPet(500,1);
            console.log("no list, adding pet");
        }
    });

    chrome.tabs.onRemoved.addListener(
        function(tabId, removeInfo) {
            chrome.storage.sync.set({"petList" : petManager.getList()}, function() {
                console.log("Tab closed, set petlist"); 
            });
        }
    );
    
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

