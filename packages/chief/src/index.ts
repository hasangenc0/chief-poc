import {Message} from "./message";
import {ChiefWorker, ChiefWorkers, Events, RegisterOptions, Subscribers} from "./types";
import {Event} from "./events";

export enum ChiefProducerType {
    DedicatedWorker = 'DedicatedWorker',
    SharedWorker = 'SharedWorker',
}

export class Chief {
    private static workers: ChiefWorkers = new Map<string, ChiefWorker>();
    private static events: Events = new Map<string, ChiefWorker[]>();
    private static subscribers: Subscribers = new Map<string, Function[]>();

    private static subscribeWorker(message: any) {
        const eventName = message.event;
        const registeredWorkers = Chief.events.get(eventName) ?? [];
        const worker = Chief.workers.get(message.worker);
        if (worker) {
            registeredWorkers.push(worker);
            Chief.events.set(eventName, registeredWorkers);
        }
    }

    private static onWorkerResult(message: any) {
        const handlers = Chief.subscribers.get(message.event);
        if (!Array.isArray(handlers)) {
            return;
        }

        handlers.forEach((handler) => {
            handler(message.result);
        });
    }

    private static messageHandler(e: MessageEvent) {
        const message = e.data;

        switch (message?.messageType) {
            case Event.EventSubscription:
                Chief.subscribeWorker(message);
                break;
            case Event.EventResult:
                Chief.onWorkerResult(message);
                break;
        }
    }

    static sharedWorker(url: string) {
        const worker = new SharedWorker(url);
        worker.port.start();
        const message: Message<{}> = {
            name: Event.RegisterWorker,
            data: {
                chief: this
            }
        };

        worker.port.postMessage(message);
    }

    static register(url: string, options: RegisterOptions) {
        if (options && options.type == ChiefProducerType.DedicatedWorker) {
            const worker = new Worker(url);
            worker.onmessage = Chief.messageHandler;
            worker.postMessage({name: url, messageType: Event.RegisterWorker});
            Chief.addWorker({worker, name: url});
            return;
        }
    }

    private static addWorker(worker: ChiefWorker) {
        Chief.workers.set(worker.name, worker);
    }

    static call(event: string, args: any) {
        const workers = Chief.events.get(event);
        if (!Array.isArray(workers)) {
            return;
        }

        workers.forEach((registered) => {
            const worker = Chief.workers.get(registered.name);
            if(worker && worker.worker instanceof  Worker) {
                worker.worker.postMessage({event, args, messageType: Event.EventPublish});
            }
        })
    }

    static on(event: string, cb: Function) {
        const handlers = Chief.subscribers.get(event) ?? [];
        handlers.push(cb);
        Chief.subscribers.set(event, handlers);
    }
}


if (self.Worker) {
    self.Chief = Chief;
}

