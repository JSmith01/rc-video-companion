async function getRcvTab() {
    const tabs = await chrome.tabs.query({ status: 'complete' });
    const filteredTabs = tabs.filter(tab => tab.title.startsWith('RingCentral Video'));

    if (filteredTabs.length > 0) {
        const inMeetingTab = filteredTabs.find(
            tab => tab.title.startsWith('RingCentral Video:')
                ? tab.url === 'about:blank'
                : tab.url.includes('/conf/on/')
        );

        return inMeetingTab ?? filteredTabs[0];
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
    // chrome.action.setBadgeText({ text: 'A' });
    // chrome.action.setBadgeBackgroundColor({ color: 'green' });
}

const toggleRcvMute = makeToggle('toggleMute');
const toggleRcvCamera = makeToggle('toggleCamera');

async function toggleRcvSharing() {
    const tabId = await switchToRcvTab();
    chrome.tabs.sendMessage(tabId, 'toggleSharing');
}

function setNoAudioNotification() {
    chrome.action.setBadgeText({ text: '' });
}

function setHasAudioNotification() {
    chrome.action.setBadgeText({ text: 'A' });
    chrome.action.setBadgeBackgroundColor({ color: 'green' });
}

function setMutedAudioNotification() {
    chrome.action.setBadgeText({ text: 'M' });
    chrome.action.setBadgeBackgroundColor({ color: 'tomato' });
}

const commands = {
    'switch-to-rcv-tab': switchToRcvTab,
    'toggle-rcv-mute': toggleRcvMute,
    'toggle-rcv-camera': toggleRcvCamera,
    'toggle-rcv-sharing': toggleRcvSharing,
};
