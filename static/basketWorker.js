importScripts('/packages/chief-worker/dist/cjs/index.js');

function addToBasket({productId}) {
    return {
        success: true,
        message: 'Added to basket',
        productId
    }
}

self.ChiefWorker.on('addToBasket', addToBasket);
