
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { api } from '../constants';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { IworkorderList } from '../../core/models/workshop';
import { headerID } from '../enums/header';
const headers = new HttpHeaders({ 
  'ecid': headerID.ECID,
  'Content-Type': 'application/json'
});

@Injectable()
export class WorkshoporderService {

  constructor(  private apiService: ApiService, private http: HttpClient) {}


  getAllTruck(sortBy:string, orderBy: string, pagenumber): Observable<[string]> {
    const body = { sortBy: sortBy, orderBy: orderBy, pageNum: pagenumber }
    const options = { headers: headers };
    return this.apiService.post(api.getTrucks, body, options)
      .pipe(map(data => data));
  }

  getAllSortedTrucks(sortBy:string, orderBy: string): Observable<[string]> {
    const body = { sortBy: sortBy, orderBy: orderBy}
    const options = { headers: headers };
    return this.apiService.post(api.getTrucks, body, options)
      .pipe(map(data => data.trucks));
  }


  getWorkordernumber(params: HttpParams = new HttpParams()): Observable<[string]> {
    const options = { headers, params };
    return this.apiService.get(api.getWorkordernumber, options)
      .pipe(map(data => data.workOrderNumber));
  }

 // create/update work order
  createorder(data, params, orderstatus:string): Observable<[string]> { 
    let orderapi = orderstatus ? api.updateorder : api.createorder; 
    const options = { headers, params }; 
    return this.apiService.post(orderapi, data, options)
      .pipe(map(data => data));
  }

  
  deleteorder(workOrderNumber: string): Observable<[string]> {
    const params = {'lang': 'en'}
    const options = { headers , params }; 
    return this.apiService.post(api.deleteworkshoporder + workOrderNumber, {}, options)
      .pipe(map(data => data));
  }

  getworkshoporderdetails(workOrderNumber: string, markerid : boolean){
    const body = {workshopOrderNumber: workOrderNumber, new : markerid}
    const params = {'lang': 'en'}
    const options = { headers, params };
    return this.apiService.post(api.getworkshoporderdetails, body, options)
      .pipe(map(data => data));
  }

  getDamageCategories(){ 
    let params = { lang: 'en' };
        const options = { headers, params };
        return this.apiService.get(api.getDamageCategory, options)
         .pipe(map(data => data)); 
  }
  
}