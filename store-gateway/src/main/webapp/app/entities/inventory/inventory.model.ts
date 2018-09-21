import { BaseEntity } from './../../shared';

export class Inventory implements BaseEntity {
    constructor(
        public id?: number,
        public storeid?: number,
        public cashDeskApplicationid?: number,
        public stockItems?: BaseEntity[],
    ) {
    }
}
