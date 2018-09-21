import { BaseEntity } from './../../shared';

export class Network implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public acquirers?: BaseEntity[],
        public banks?: BaseEntity[],
    ) {
    }
}
