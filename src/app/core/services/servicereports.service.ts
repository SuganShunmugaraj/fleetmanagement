
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { api } from '../constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { headerID } from '../enums/header';
const headers = new HttpHeaders({
  'IV-USER': headerID.IV_USER,
  'ecid': headerID.ECID,
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAllReports(): Observable<[string]> {
    const body = {sortBy: '', orderBy : ''}
    const params = { 'lang': 'en' }
    const options = { headers, params };
    return this.apiService.post(api.getReportlist, body , options)
      .pipe(map(data => data));
  }

  getSortedReports(sortBy, orderBy, pageNum  ): Observable<[string]> {
    const body = {sortBy, orderBy , pageNum }
    const params = { 'lang': 'en' }
    const options = { headers, params };
    return this.apiService.post(api.getReportlist, body, options)
      .pipe(map(data => data.serviceReports));
  }

  getReportDetails(reportnumber: string, serialnumber: string): Observable<[string]> {
    const params = { 'lang': 'en' }
    const options = { headers, params };
    const payload = {
      "serialNumber": serialnumber,
      "reportNumber": reportnumber
    }

    return this.apiService.post(api.getReportlistDetail, payload, options)
      .pipe(map(data => data));
  }

}