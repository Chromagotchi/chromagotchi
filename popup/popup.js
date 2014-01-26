function pushToContext(signal, value) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {signal: signal, value: value}, 
            function(response) {
            // alert("worked");
        });
    });
}

window.addEventListener('load', function() {
    /*
    if (typeof jQuery != 'undefined') {
        alert("jQuery library is loaded!");
    } else {
        alert("jQuery library is not found!");
    }
    */
    $('#createFood').click(function() {
        console.log("food link clicked");
        pushToContext("food", "food");
    });

    $('#createBall').click(function() {
        console.log("ball link clicked");
        pushToContext("ball", "ball");
    });

    $('#createBed').click(function() {
        console.log("bed link clicked");
        pushToContext("bed", "bed");
    });

    $('#refresh-color').click(function() {
        var colorVal = $("#pet-color").val() || "000";
        colorVal = "#" + colorVal;
        pushToContext("color", colorVal); 
    });
});


