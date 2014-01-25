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
    $('#refresh-color').click(function() {
        var colorVal = $("#pet-color").val() || "000";
        colorVal = "#" + colorVal;
        pushToContext("color", colorVal); 
    });
});
