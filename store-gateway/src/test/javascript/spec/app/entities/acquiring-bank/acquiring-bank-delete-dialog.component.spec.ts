/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { AcquiringBankDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank-delete-dialog.component';
import { AcquiringBankService } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.service';

describe('Component Tests', () => {

    describe('AcquiringBank Management Delete Component', () => {
        let comp: AcquiringBankDeleteDialogComponent;
        let fixture: ComponentFixture<AcquiringBankDeleteDialogComponent>;
        let service: AcquiringBankService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [AcquiringBankDeleteDialogComponent],
                providers: [
                    AcquiringBankService
                ]
            })
            .overrideTemplate(AcquiringBankDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcquiringBankDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcquiringBankService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
