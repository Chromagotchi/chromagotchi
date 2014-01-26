function isOnTab(oldTab, newTab, petManager) {
    var oldIndex = null;
    var newIndex = null;
    if (oldTab && oldTab.index)
        oldIndex = oldTab.index;
    if (newTab && newTab.index)
        newIndex = newTab.index;

    if (oldIndex == null || newIndex == null) {
        return true;
    }
    if ((oldIndex + 1) == newIndex && petManager.getTabStatus() == 'LEFT') {
        return true;
    }
    else if ((oldIndex - 1) == newIndex && petManager.getTabStatus() == 'RIGHT') {
        return true;
    }
    else if (oldIndex == newIndex) {
        return true;
    }
    return false;
}

window.addEventListener('load', function() {
    var petManager = null; // global petManager

    chrome.windows.getCurrent(function(w) {
        // Our tab runner feature is as follows. If our creature remains crossing 
        // either the left or right X-coord boundaries when a tab is switched to
        // either the left or right lab of the current, the entity will move to 
        // the new tab.

        var storedWindowInfo = {};
        chrome.tabs.onActivated.addListener(function(activeInfo) {
            chrome.tabs.get(activeInfo.tabId, function(tab) {
                var curTab = null;
                var prevTab = null;
                if (tab) {
                    curTab = tab;
                }

                prevTab = storedWindowInfo[activeInfo.windowId] || null;
                
                if(curTab) {
                    var queryFrom = null;
                    if (!prevTab) 
                        queryFrom = curTab;
                    else
                        queryFrom = prevTab;

                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        //console.log('queryFrom ' + queryFrom.id + ' new tabs '+tabs[0].id);
                        chrome.tabs.sendMessage(queryFrom.id, {signal: "petManager"},
                                function(response) {
                                    console.log('petManager reques sent!');

                                    petManager = response.petManager;
                                }
                        );   
                    });
                }
                
                if ( isOnTab(prevTab, curTab, petManager) ) {
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {signal: "newPet", petManager: petManager},
                            function(response) {
                                //
                            });
                    });
                }
                // Update ID of currently active tab in the current window
                storedWindowInfo[activeInfo.windowId] = tab;
            });
        });
    });
});
