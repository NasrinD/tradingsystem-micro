import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from '../../shared';
import {
    NetworkService,
    NetworkPopupService,
    NetworkComponent,
    NetworkDetailComponent,
    NetworkDialogComponent,
    NetworkPopupComponent,
    NetworkDeletePopupComponent,
    NetworkDeleteDialogComponent,
    networkRoute,
    networkPopupRoute,
} from './';

const ENTITY_STATES = [
    ...networkRoute,
    ...networkPopupRoute,
];

@NgModule({
    imports: [
        StoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NetworkComponent,
        NetworkDetailComponent,
        NetworkDialogComponent,
        NetworkDeleteDialogComponent,
        NetworkPopupComponent,
        NetworkDeletePopupComponent,
    ],
    entryComponents: [
        NetworkComponent,
        NetworkDialogComponent,
        NetworkPopupComponent,
        NetworkDeleteDialogComponent,
        NetworkDeletePopupComponent,
    ],
    providers: [
        NetworkService,
        NetworkPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreNetworkModule {}
