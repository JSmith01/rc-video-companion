self.importScripts('commands.js');

chrome.commands.onCommand.addListener(function(command) {
    if (command in commands) {
        commands[command]?.();
    }
});

chrome.runtime.onMessage.addListener(message => {
    switch (message?.type) {
        case 'no-audio':
            setNoAudioNotification();
            break;
        case 'has-audio':
            setHasAudioNotification();
            break;
        case 'muted-audio':
            setMutedAudioNotification();
            break;
    }
});
