import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bank } from './bank.model';
import { BankPopupService } from './bank-popup.service';
import { BankService } from './bank.service';
import { Network, NetworkService } from '../network';

@Component({
    selector: 'jhi-bank-dialog',
    templateUrl: './bank-dialog.component.html'
})
export class BankDialogComponent implements OnInit {

    bank: Bank;
    isSaving: boolean;

    networks: Network[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bankService: BankService,
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
        if (this.bank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankService.update(this.bank));
        } else {
            this.subscribeToSaveResponse(
                this.bankService.create(this.bank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bank>>) {
        result.subscribe((res: HttpResponse<Bank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bank) {
        this.eventManager.broadcast({ name: 'bankListModification', content: 'OK'});
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
    selector: 'jhi-bank-popup',
    template: ''
})
export class BankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankPopupService: BankPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankPopupService
                    .open(BankDialogComponent as Component, params['id']);
            } else {
                this.bankPopupService
                    .open(BankDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
