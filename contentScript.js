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

function waitForApi() {
    if (typeof window[Symbol.for('rwcInternalApi')] === 'object') {
        return Promise.resolve();
    }

    let resolve;
    const res = new Promise(r => {
        resolve = r;
    });

    const inMessenger = document.getElementById('root');
    if (inMessenger) {
        const m = new MutationObserver(() => {
            if (window['rwc-client-block'].firstChild && window[Symbol.for('rwcInternalApi')]) {
                m.disconnect();
                resolve();
            }
        });
        m.observe(inMessenger, { childList:true, subtree: true });
    } else {
        const mp = document.getElementById('mount-point');
        if (!mp) return Promise.reject();
        const m = new MutationObserver(() => {
            if (mp.firstChild && window[Symbol.for('rwcInternalApi')]) {
                m.disconnect();
                resolve();
            }
        });
        m.observe(mp, { childList: true, subtree: true });
    }

    return res;
}

waitForApi().then(
    () => {
        console.warn('💡💡💡💡💡RCV loaded');
        const api = window[Symbol.for('rwcInternalApi')];
        api.on('call/state', );
    },
    () => console.error('💡💡💡💡💡No RCV')
);
