import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public address?: string,
    ) {
    }
}
