// Initialize button with user's preferred color
let controls = Object.fromEntries(
    ['activateRcvTab', 'toggleMute', 'toggleSharing', 'enableGlobalShortcuts'].map(
        id => [id, document.getElementById(id)]
    )
)

async function getRcvTab() {
    const tabs = await chrome.tabs.query({ status: 'complete', title: 'RingCentral Video' });

    if (tabs.length > 0) {
        const inMeetingTab = tabs.find(tab => tab.url.includes('/conf/on/'));

        return inMeetingTab ?? tabs[0];
    } else {
        return null;
    }
}

// When the button is clicked, inject setPageBackgroundColor into current page
controls.activateRcvTab.addEventListener('click', async () => {
    const tab = await getRcvTab();

    if (tab) {
        chrome.tabs.update(tab.id, { highlighted: true });
        chrome.windows.update(tab.windowId, { focused: true });
    }
});

controls.toggleMute.addEventListener('click', async () => {
    const tab = await getRcvTab();

    if (tab) {
        chrome.tabs.sendMessage(tab.id, 'toggleMute');
    }
});
