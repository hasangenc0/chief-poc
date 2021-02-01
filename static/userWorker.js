function isValidMessage(message) {
    return message.hasOwnProperty('name') && !message.hasOwnProperty('data');
}

self.onconnect = function(e) {
    var port = e.ports[0];
    port.onmessage = function(e) {
        port.postMessage();
    }
};
