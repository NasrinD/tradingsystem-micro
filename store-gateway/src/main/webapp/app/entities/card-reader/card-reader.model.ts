import { BaseEntity } from './../../shared';

export class CardReader implements BaseEntity {
    constructor(
        public id?: number,
        public model?: string,
        public cashDeskid?: number,
        public controller?: BaseEntity,
        public acquirer?: BaseEntity,
    ) {
    }
}
