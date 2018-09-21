/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { AcquirerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/acquirer/acquirer-delete-dialog.component';
import { AcquirerService } from '../../../../../../main/webapp/app/entities/acquirer/acquirer.service';

describe('Component Tests', () => {

    describe('Acquirer Management Delete Component', () => {
        let comp: AcquirerDeleteDialogComponent;
        let fixture: ComponentFixture<AcquirerDeleteDialogComponent>;
        let service: AcquirerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [AcquirerDeleteDialogComponent],
                providers: [
                    AcquirerService
                ]
            })
            .overrideTemplate(AcquirerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcquirerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcquirerService);
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
