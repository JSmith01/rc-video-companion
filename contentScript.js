window.addEventListener('message', e => {
    const { data } = e;
    if (
        data == null ||
        typeof data !== 'object' ||
        data.id == null ||
        data.type == null ||
        !String(data.type).startsWith('rcvHelperExtension_')
    ) return;

    e.stopImmediatePropagation();

    const eventName = data.type.replace(/^rcvHelperExtension_/, '');
    switch (eventName) {
        case 'init':
            window.postMessage({ id: data.id, resp: data.type }, '*');
            break;
        case 'cpuInfo':
            chrome.runtime.sendMessage(
                'cpuInfo',
                cpuInfo => window.postMessage({ id: data.id, resp: 'cpuInfo', data: cpuInfo }, '*')
            );
            break;
        default:
            const errorMessage = `Unknown message type "${eventName}"`;
            console.warn(`RC Video Helper extension: ${errorMessage}`);
            window.postMessage({ id: data.id, resp: 'error', error: errorMessage }, '*');
            break;
    }
});

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
