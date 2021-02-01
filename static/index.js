/*var basketWorker = new SharedWorker('/static/basketWorker.js');

basketWorker.port.start();
basketWorker.port.onmessage = function(e) {
    console.log('Message received from basketWorker:', e.data);
};

basketWorker.port.postMessage({message: 'selam to basket'});
console.log('Message posted to worker');


var favoriteWorker = new Worker("/static/favoriteWorker.js");
favoriteWorker.onmessage = function(e) {
    console.log('Message received from favoriteWorker:', e.data);
};

favoriteWorker.postMessage({message: 'selam to favorite'});*/

self.Chief.register('/static/favoriteWorker.js', { type: 'DedicatedWorker' });
self.Chief.register('/static/basketWorker.js', { type: 'DedicatedWorker' });
self.Chief.register('/static/userWorker.js', { type: 'SharedWorker' });

document.getElementById("addToFavoriteButton").addEventListener('click', () => {
    self.Chief.call('addToFavorite', {productId: 61});
});

self.Chief.on('addToFavorite', (result) => {
    const el = document.createElement('div');
    el.innerHTML = result.message;
    document.body.append(el);
});

document.getElementById("removeFromFavorites").addEventListener('click', () => {
    self.Chief.call('removeFromFavorites', {productId: 61});
});
self.Chief.on('removeFromFavorites', (result) => {
    const el = document.createElement('div');
    el.innerHTML = result.message;
    document.body.append(el);
});

document.getElementById("addToBasketButton").addEventListener('click', () => {
    self.Chief.call('addToBasket', {productId: 61});
});

self.Chief.on('addToBasket', (result) => {
    const el = document.createElement('div');
    el.innerHTML = result.message;
    document.body.append(el);
});
