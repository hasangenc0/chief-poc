import {ChiefProducerType} from "./index";

type ChiefWorker = {
    name: string;
    worker: Worker | SharedWorker;
}

type ChiefWorkers = Map<string, ChiefWorker>


type RegisterOptions = {
    type: ChiefProducerType;
}
