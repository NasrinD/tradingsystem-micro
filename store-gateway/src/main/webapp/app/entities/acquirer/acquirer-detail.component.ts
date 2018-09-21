import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Acquirer } from './acquirer.model';
import { AcquirerService } from './acquirer.service';

@Component({
    selector: 'jhi-acquirer-detail',
    templateUrl: './acquirer-detail.component.html'
})
export class AcquirerDetailComponent implements OnInit, OnDestroy {

    acquirer: Acquirer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private acquirerService: AcquirerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAcquirers();
    }

    load(id) {
        this.acquirerService.find(id)
            .subscribe((acquirerResponse: HttpResponse<Acquirer>) => {
                this.acquirer = acquirerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAcquirers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'acquirerListModification',
            (response) => this.load(this.acquirer.id)
        );
    }
}
