import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../models/Prescription';

const API_URL = 'api/v1/prescriptions';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionManagementService {

  constructor(private http: HttpClient) { }
  
  protected getHttpParams ( params: Map<string, string> ): HttpParams
  {
      let httpParams = new HttpParams();
      params.forEach( ( value: string, key: string ) =>
      {
          httpParams = httpParams.set( key, value );
      } );
      return httpParams;
  }

    getPrescriptions(searchQuery: any): Observable<any> {
      const options = { params :this.getHttpParams(searchQuery) }
      return this.http.get(API_URL, options);
    }

    updatePrescription(body: Prescription, id: number): Observable<any> {
      return this.http.put(API_URL + '/' + id, body);
    }

    deletePrescription(id: number): Observable<any> {
      return this.http.delete(API_URL+ '/' +  id);
    }

    createPrescription(body: Prescription): Observable<any> {
      return this.http.post(API_URL, body);
    }
}
