import { BaseEntity } from './../../shared';

export class CashDesk implements BaseEntity {
    constructor(
        public id?: number,
        public cardReaderid?: number,
        public printer?: BaseEntity,
        public cashBox?: BaseEntity,
        public cashDeskGui?: BaseEntity,
        public barCodeScanner?: BaseEntity,
        public cashDeskApplication?: BaseEntity,
    ) {
    }
}
