import {Event} from './events';

export class ChiefWorker {
    private static workerName: string = '';
    private static events = new Map<string, Function>();

    static on(event: string, callback: Function) {
        ChiefWorker.events.set(event, callback);
    }

    static register(message: any) {
        if(message?.name) {
            ChiefWorker.workerName = message.name;

            ChiefWorker.events.forEach((_: Function, event: string) => {
                postMessage({event, worker: ChiefWorker.workerName, messageType: Event.EventSubscription});
            });
        }
    }

    static async publish(message: any) {
        if(message?.event) {
            const handler = ChiefWorker.events.get(message.event);
            if (handler) {
                const result = await handler(message?.args);
                postMessage({event: message.event, result, messageType: Event.EventResult});
            }
        }
    }

    static onmessage = function(e: MessageEvent) {
        const message = e.data;
        switch (message?.messageType) {
            case Event.RegisterWorker:
                ChiefWorker.register(message);
                break;
            case Event.EventPublish:
                ChiefWorker.publish(message);
                break;
        }
    };
}


if (self.Worker) {
    self.ChiefWorker = ChiefWorker;
    self.onmessage = ChiefWorker.onmessage;
}
