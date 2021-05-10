window.addEventListener('message', e => {
    if (e.data === 'requestCpuInfo') {
        chrome.runtime.sendMessage(
            'requestCpuInfo',
            cpuInfo => window.postMessage({ cpuInfo }, '*')
        )
    }
});

const script = document.createElement('script');
script.src = chrome.runtime.getURL('initCpuInfo.js');
document.documentElement.appendChild(script);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request === 'toggleMute') {
            const muteButton = document.querySelector('button[data-at=muteAudioBtn]');
            muteButton?.click?.();
            sendResponse(!!muteButton);
        }
    }
);
