
console.log('please work?');
window.addEventListener('load', function() {
    console.log('please work?');
    chrome.windows.getCurrent(function(w) {
        console.log('please work22?');
        var storedWindowInfo = {};
        chrome.tabs.onActivated.addListener(function(activeInfo) {
            var windowLastTabId = storedWindowInfo[activeInfo.windowId];
            if (windowLastTabId) {
                console.log('previous tab was '+windowLastTabId+
                        'current tab is '+activeInfo.tabIdi);
                chrome.tabs.sendMessage(windowLastTabId);
            }
            // Update ID of currently active tab in the current window
            storedWindowInfo[activeInfo.windowId] = activeInfo.tabId;
            console.log('storing '+activeInfo.tabId+' as current id');
        });
    });
});
