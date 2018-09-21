import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Acquirer } from './acquirer.model';
import { AcquirerPopupService } from './acquirer-popup.service';
import { AcquirerService } from './acquirer.service';
import { Network, NetworkService } from '../network';

@Component({
    selector: 'jhi-acquirer-dialog',
    templateUrl: './acquirer-dialog.component.html'
})
export class AcquirerDialogComponent implements OnInit {

    acquirer: Acquirer;
    isSaving: boolean;

    networks: Network[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private acquirerService: AcquirerService,
        private networkService: NetworkService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.networkService.query()
            .subscribe((res: HttpResponse<Network[]>) => { this.networks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.acquirer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.acquirerService.update(this.acquirer));
        } else {
            this.subscribeToSaveResponse(
                this.acquirerService.create(this.acquirer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Acquirer>>) {
        result.subscribe((res: HttpResponse<Acquirer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Acquirer) {
        this.eventManager.broadcast({ name: 'acquirerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNetworkById(index: number, item: Network) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-acquirer-popup',
    template: ''
})
export class AcquirerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private acquirerPopupService: AcquirerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.acquirerPopupService
                    .open(AcquirerDialogComponent as Component, params['id']);
            } else {
                this.acquirerPopupService
                    .open(AcquirerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
