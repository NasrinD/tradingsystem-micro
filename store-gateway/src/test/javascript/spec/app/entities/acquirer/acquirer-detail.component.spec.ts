/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StoreTestModule } from '../../../test.module';
import { AcquirerDetailComponent } from '../../../../../../main/webapp/app/entities/acquirer/acquirer-detail.component';
import { AcquirerService } from '../../../../../../main/webapp/app/entities/acquirer/acquirer.service';
import { Acquirer } from '../../../../../../main/webapp/app/entities/acquirer/acquirer.model';

describe('Component Tests', () => {

    describe('Acquirer Management Detail Component', () => {
        let comp: AcquirerDetailComponent;
        let fixture: ComponentFixture<AcquirerDetailComponent>;
        let service: AcquirerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [AcquirerDetailComponent],
                providers: [
                    AcquirerService
                ]
            })
            .overrideTemplate(AcquirerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcquirerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcquirerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Acquirer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.acquirer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
