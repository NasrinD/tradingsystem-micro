import { BaseEntity } from './../../shared';

export class Store implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public inventoryid?: number,
        public cashDesk?: BaseEntity,
    ) {
    }
}
