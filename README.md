# Event Driven Messaging with Web Workers

Move your ui independent jobs to the [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

<div>
    <img align="top" src="/static/main-js.png"/>
    <img align="top" src="/static/worker-js.png"/>
</div>

## Examples

### Subscribing an event
#### main.js
```js
import 'chief'

Chief.register('/basketWorker.js', { type: 'DedicatedWorker' });

Chief.on('addToBasket', (result) => {
    alert(result);
});

Chief.call('addToBasket', {productId});
```

#### basketWorker.js
```js
import 'chief-worker'

const addToBasket = ({productId}) => {
    return {
        success: true,
        message: 'Added to basket',
        productId
    }
}

ChiefWorker.on('addToBasket', addToBasket);
```
