import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Acquirer } from './acquirer.model';
import { AcquirerPopupService } from './acquirer-popup.service';
import { AcquirerService } from './acquirer.service';

@Component({
    selector: 'jhi-acquirer-delete-dialog',
    templateUrl: './acquirer-delete-dialog.component.html'
})
export class AcquirerDeleteDialogComponent {

    acquirer: Acquirer;

    constructor(
        private acquirerService: AcquirerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acquirerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'acquirerListModification',
                content: 'Deleted an acquirer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acquirer-delete-popup',
    template: ''
})
export class AcquirerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private acquirerPopupService: AcquirerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.acquirerPopupService
                .open(AcquirerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
