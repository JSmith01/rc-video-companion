self.importScripts('commands.js');

chrome.commands.onCommand.addListener(function(command) {
    if (command in commands) {
        commands[command]?.();
    }
});
