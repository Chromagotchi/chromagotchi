document.getElementById("theButton").addEventListener("click", function() {
    window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
}, false);
