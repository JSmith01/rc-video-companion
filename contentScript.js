const commandButtons = {
    toggleMute: 'button[data-at=muteAudioBtn]',
    toggleCamera: 'button[data-at=muteVideoBtn]',
    toggleSharing: 'button[data-at=SSBtn]',
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request in commandButtons) {
            const button = document.querySelector(commandButtons[request]);
            button?.click?.();
            sendResponse(!!button);
            return true;
        }
    }
);
