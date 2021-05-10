chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (chrome?.system?.cpu?.getInfo) {
            chrome.system.cpu.getInfo(sendResponse);
        } else {
            sendResponse('unavailable');
        }

        return true;
    }
);
