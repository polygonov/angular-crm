import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SettingsService} from "../../../shared/services/settings.service";

export interface Bill {
  value: number,
  currency: string
}

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private http: HttpClient,
    public settingsService: SettingsService
  ) { }

  getBill = (): Observable<Bill> => {
    return this.http.get<Bill>(`${this.settingsService.baseUrl}bill`)
  }

  getCurrency = (): Observable<any> => {
    return this.http.get<any>('https://www.cbr-xml-daily.ru/daily_json.js')
  }

  updateBill = (bill: Bill): Observable<Bill> => {
    return this.http.put<Bill>(`${this.settingsService.baseUrl}bill`, bill)
  }
}
