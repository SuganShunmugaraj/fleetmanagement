
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
export class ConfigurationService {

	constructor(private apiService: ApiService, private http: HttpClient) { }

	createDamageCategory(data): Observable<[string]> {
		const options = { headers };
		return this.apiService.post(api.createDamageCategory, data, options).pipe(map(data => data));
	}

	getDamageCategory() {
		let params = { lang: 'en' };
		const options = { headers, params };
		return this.apiService.get(api.getDamageCategory, options)
		  .pipe(map(data => data));
	
	  }

    updateDamageCategory(data): Observable<[string]> {
		let params = { lang: 'en' };
		const options = { headers , params };
		return this.apiService.post(api.updateDamageCategory, data, options).pipe(map(data => data));
	}

	getadaptedWorkshopOrder(clientId: string, damageCategoryId: string){
		let params = { lang: 'en' };
		const options = { headers, params };
		return this.apiService.get(api.adapteWorkshopOrders + clientId +'/' + damageCategoryId, options)
		  .pipe(map(data => data));
	
	}

	deleteDamageCategory(damageCategoryId: string){
	let params = { lang: 'en' };
		const options = { headers, params };
		return this.apiService.post(api.deleteDamageCategory + damageCategoryId,{}, options)
		  .pipe(map(data => data));
	}

	/*Slot Configuration*/
	getSlot() {
		let params = { lang: 'en' };
		const options = { headers, params };
		return this.apiService.get(api.getslots, options)
		  .pipe(map(data => data));
	
	  }

	  createSlot(data): Observable<[string]> {
		let params = { lang: 'en' };
		const options = { headers , params};
		return this.apiService.post(api.createslot, data, options).pipe(map(data => data));
	}

	
    updateSlot(data): Observable<[string]> {
		let params = { lang: 'en' };
		const options = { headers , params };
		return this.apiService.post(api.updateslot, data, options).pipe(map(data => data));
	}

	deleteSlot(slotId: string, clientId: string){
		let params = { lang: 'en' };
			const options = { headers, params };
			return this.apiService.post(api.deleteslot + slotId + '/' + clientId, {}, options)
			  .pipe(map(data => data));
		}
}