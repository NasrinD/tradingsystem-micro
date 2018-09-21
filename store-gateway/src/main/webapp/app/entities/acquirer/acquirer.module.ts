import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from '../../shared';
import {
    AcquirerService,
    AcquirerPopupService,
    AcquirerComponent,
    AcquirerDetailComponent,
    AcquirerDialogComponent,
    AcquirerPopupComponent,
    AcquirerDeletePopupComponent,
    AcquirerDeleteDialogComponent,
    acquirerRoute,
    acquirerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...acquirerRoute,
    ...acquirerPopupRoute,
];

@NgModule({
    imports: [
        StoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AcquirerComponent,
        AcquirerDetailComponent,
        AcquirerDialogComponent,
        AcquirerDeleteDialogComponent,
        AcquirerPopupComponent,
        AcquirerDeletePopupComponent,
    ],
    entryComponents: [
        AcquirerComponent,
        AcquirerDialogComponent,
        AcquirerPopupComponent,
        AcquirerDeleteDialogComponent,
        AcquirerDeletePopupComponent,
    ],
    providers: [
        AcquirerService,
        AcquirerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreAcquirerModule {}
