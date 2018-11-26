import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from '../../shared';
import {
    IssuingBankService,
    IssuingBankPopupService,
    IssuingBankComponent,
    IssuingBankDetailComponent,
    IssuingBankDialogComponent,
    IssuingBankPopupComponent,
    IssuingBankDeletePopupComponent,
    IssuingBankDeleteDialogComponent,
    issuingBankRoute,
    issuingBankPopupRoute,
} from './';

const ENTITY_STATES = [
    ...issuingBankRoute,
    ...issuingBankPopupRoute,
];

@NgModule({
    imports: [
        StoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IssuingBankComponent,
        IssuingBankDetailComponent,
        IssuingBankDialogComponent,
        IssuingBankDeleteDialogComponent,
        IssuingBankPopupComponent,
        IssuingBankDeletePopupComponent,
    ],
    entryComponents: [
        IssuingBankComponent,
        IssuingBankDialogComponent,
        IssuingBankPopupComponent,
        IssuingBankDeleteDialogComponent,
        IssuingBankDeletePopupComponent,
    ],
    providers: [
        IssuingBankService,
        IssuingBankPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreIssuingBankModule {}
