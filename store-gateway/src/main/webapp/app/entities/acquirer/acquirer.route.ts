import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AcquirerComponent } from './acquirer.component';
import { AcquirerDetailComponent } from './acquirer-detail.component';
import { AcquirerPopupComponent } from './acquirer-dialog.component';
import { AcquirerDeletePopupComponent } from './acquirer-delete-dialog.component';

export const acquirerRoute: Routes = [
    {
        path: 'acquirer',
        component: AcquirerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.acquirer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'acquirer/:id',
        component: AcquirerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.acquirer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acquirerPopupRoute: Routes = [
    {
        path: 'acquirer-new',
        component: AcquirerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.acquirer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'acquirer/:id/edit',
        component: AcquirerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.acquirer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'acquirer/:id/delete',
        component: AcquirerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.acquirer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
