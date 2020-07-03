
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { api } from '../constants';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { IworkorderList } from '../../core/models/workshop';
import { headerID } from '../enums/header';
import { Subject } from 'rxjs';
const headers = new HttpHeaders({
  'IV-USER': headerID.IV_USER,
  'ecid': headerID.ECID,
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class EditworkshoporderService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getWaitingList() {
    const options = { headers: headers };
    const body = {
      sortingOrder: "ASC",
      workStatus: "WAITING"
    }
    return this.apiService.post(api.getworkshoporderlists, body, options)
      .pipe(map(data => data));
  }


  getInprogressList() {
    const options = { headers: headers };
    const body = {
      sortingOrder: "ASC",
      workStatus: "INPROGRESS"
    }
    return this.apiService.post(api.getworkshoporderlists, body, options)
      .pipe(map(data => data));
  }



  updateWorkstatus(data): Observable<[string]> {
    let paramObj = { serialNumber: data.serialNumber, shipToPartyNo: data.shipToPartyNo };
    const options = { headers, params: paramObj };
    return this.apiService.post(api.updateorder, data, options).pipe(map(data => data));
  }

  getTechnician(clientId) {
    let params = { lang: 'en' };
    const options = { headers, params };
    return this.apiService.get(api.getTechnician + clientId, options)
      .pipe(map(data => data));

  }

  getUsstTechnician() {
    let params = { lang: 'en' };
    const options = { headers, params };
    return this.apiService.get(api.getUsstTechnician, options)
      .pipe(map(data => data));

  }


  addTechnician(clientId, name) {
    let params = { lang: 'en' };
    const options = { headers, params };
    let body = { name, clientId } 
    return this.apiService.post(api.addTechnician, body, options)
      .pipe(map(data => data));
  }

  deleteTechnician(technicianNumber) { 
    let params = { lang: 'en' };
    const options = { headers, params };
    return this.apiService.post(api.deleteTechnician +  technicianNumber, {}, options)
      .pipe(map(data => data));
  }



}