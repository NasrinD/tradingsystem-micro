/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StoreTestModule } from '../../../test.module';
import { AcquirerComponent } from '../../../../../../main/webapp/app/entities/acquirer/acquirer.component';
import { AcquirerService } from '../../../../../../main/webapp/app/entities/acquirer/acquirer.service';
import { Acquirer } from '../../../../../../main/webapp/app/entities/acquirer/acquirer.model';

describe('Component Tests', () => {

    describe('Acquirer Management Component', () => {
        let comp: AcquirerComponent;
        let fixture: ComponentFixture<AcquirerComponent>;
        let service: AcquirerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [AcquirerComponent],
                providers: [
                    AcquirerService
                ]
            })
            .overrideTemplate(AcquirerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcquirerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcquirerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Acquirer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.acquirers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
