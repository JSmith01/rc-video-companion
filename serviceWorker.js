self.importScripts('commands.js');

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

chrome.commands.onCommand.addListener(function(command) {
    if (command in commands) {
        commands[command]?.();
    }
});
