// Filename: background.js
// Author: Harshad Shirsat
// Plugin info: This plugin is used to convert html tables into excel files.
// Plugin support: Chrome version 
// Description: This file is extension's background script.
//              This script is used to inject another javascript
//              called tableParser.js into currently loaded page
//              to convert & download html tables into excel file format.
// Constraints: Doesn't work for tables contained in iFrames

chrome.browserAction.onClicked.addListener(function (tab) {
    console.log("click");
    // Inject tableParser.js on extension icon click into currently loaded page.
    chrome.tabs.executeScript(null, {
        file: "tableParser.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
    });
});