import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NlmDataService {

  constructor(private http: HttpClient) { }
  repostoriesApiUrl = 'https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=341248';


  getNLMData(): Observable<any> {
    return this.http.get(this.repostoriesApiUrl);
  }
}
