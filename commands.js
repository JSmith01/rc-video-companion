async function getRcvTab() {
    const tabs = await chrome.tabs.query({ status: 'complete', title: 'RingCentral Video' });

    if (tabs.length > 0) {
        const inMeetingTab = tabs.find(tab => tab.url.includes('/conf/on/'));

        return inMeetingTab ?? tabs[0];
    } else {
        return null;
    }
}

async function switchToRcvTab() {
    const tab = await getRcvTab();

    if (!tab) {
        return;
    }

    chrome.tabs.update(tab.id, { highlighted: true });
    chrome.windows.update(tab.windowId, { focused: true });

    return Number(tab.id);
}

const makeToggle = command => async function toggleCommand() {
    const tab = await getRcvTab();

    if (tab) {
        chrome.tabs.sendMessage(tab.id, command);
    }
}

const toggleRcvMute = makeToggle('toggleMute');
const toggleRcvCamera = makeToggle('toggleCamera');

async function toggleRcvSharing() {
    const tabId = await switchToRcvTab();
    chrome.tabs.sendMessage(tabId, 'toggleSharing');
}

const commands = {
    'switch-to-rcv-tab': switchToRcvTab,
    'toggle-rcv-mute': toggleRcvMute,
    'toggle-rcv-camera': toggleRcvCamera,
    'toggle-rcv-sharing': toggleRcvSharing,
};
