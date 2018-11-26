/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { CardReaderDialogComponent } from '../../../../../../main/webapp/app/entities/card-reader/card-reader-dialog.component';
import { CardReaderService } from '../../../../../../main/webapp/app/entities/card-reader/card-reader.service';
import { CardReader } from '../../../../../../main/webapp/app/entities/card-reader/card-reader.model';
import { CardReaderControllerService } from '../../../../../../main/webapp/app/entities/card-reader-controller';
import { AcquiringBankService } from '../../../../../../main/webapp/app/entities/acquiring-bank';

describe('Component Tests', () => {

    describe('CardReader Management Dialog Component', () => {
        let comp: CardReaderDialogComponent;
        let fixture: ComponentFixture<CardReaderDialogComponent>;
        let service: CardReaderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [CardReaderDialogComponent],
                providers: [
                    CardReaderControllerService,
                    AcquiringBankService,
                    CardReaderService
                ]
            })
            .overrideTemplate(CardReaderDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardReaderDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardReaderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardReader(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cardReader = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardReaderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardReader();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cardReader = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardReaderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
