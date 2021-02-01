import {ChiefProducerType} from "./index";

type ChiefWorker = {
    name: string;
    worker: Worker | SharedWorker;
};

type ChiefWorkers = Map<string, ChiefWorker>;

type Events = Map<string, ChiefWorker[]>;

type Subscribers = Map<string, Function[]>

type RegisterOptions = {
    type: ChiefProducerType;
};
