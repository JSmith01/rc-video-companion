chrome.commands.getAll(allCommands => {
    Object.entries(commands).forEach(([id, handler]) => {
        const element = document.getElementById(id);
        if (!element) return;
        const shortcut = allCommands.find(cmd => cmd.name === id)?.shortcut;
        if (!handler) {
            element.disabled = true;
        } else {
            element.addEventListener('click', handler);
            if (shortcut) {
                element.nextElementSibling.innerText = `[${shortcut}]`;
            }
        }
    });
})

document.getElementById('configureShortcuts').addEventListener('click', () => {
    chrome.tabs.create({
        url: 'chrome://extensions/configureCommands',
        active: true
    });
});
