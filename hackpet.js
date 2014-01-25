console.log("TEST1");
$(document).ready(function() {
    console.log("TEST2");
    var square = document.createElement("div");
    square.style.width = "100px";
    square.style.height = "100px";
    square.style.backgroundColor = "red";

    square.id = "square";

    document.body.appendChild(square);

    $(square).click(function() {
        console.log("ONCLICK TEST");
        square.style.backgroundColor = "blue";    
    });

    chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.onMessage.addListener(function(msg) {
            console.log("message recieved"+ msg);
            port.postMessage("Hi Popup.js");
        });
    });
});

