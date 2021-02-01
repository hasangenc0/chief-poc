importScripts('/packages/chief-worker/dist/cjs/index.js');

async function addToFavorite({productId}) {
    const result = new Promise((resolve) => {
       setTimeout(() => {
           resolve({
               success: true,
                   message: 'Added to favorites',
               productId
           });
       }, 2000);
    });
    return await result;
}

function removeFromFavorites({productId}) {
    return {
        success: true,
        message: 'Removed from favorites',
        productId
    }
}

self.ChiefWorker.on('addToFavorite', addToFavorite);
self.ChiefWorker.on('removeFromFavorites', removeFromFavorites);
