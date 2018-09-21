import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Acquirer } from './acquirer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Acquirer>;

@Injectable()
export class AcquirerService {

    private resourceUrl =  SERVER_API_URL + 'customer/api/acquirers';

    constructor(private http: HttpClient) { }

    create(acquirer: Acquirer): Observable<EntityResponseType> {
        const copy = this.convert(acquirer);
        return this.http.post<Acquirer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(acquirer: Acquirer): Observable<EntityResponseType> {
        const copy = this.convert(acquirer);
        return this.http.put<Acquirer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Acquirer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Acquirer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Acquirer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Acquirer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Acquirer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Acquirer[]>): HttpResponse<Acquirer[]> {
        const jsonResponse: Acquirer[] = res.body;
        const body: Acquirer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Acquirer.
     */
    private convertItemFromServer(acquirer: Acquirer): Acquirer {
        const copy: Acquirer = Object.assign({}, acquirer);
        return copy;
    }

    /**
     * Convert a Acquirer to a JSON which can be sent to the server.
     */
    private convert(acquirer: Acquirer): Acquirer {
        const copy: Acquirer = Object.assign({}, acquirer);
        return copy;
    }
}
