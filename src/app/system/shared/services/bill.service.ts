import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Bill {
  value: number,
  currency: string
}

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBill = (): Observable<Bill> => {
    return this.http.get<Bill>('http://localhost:3000/bill')
  }

  getCurrency = (): Observable<any> => {
    return this.http.get<any>('https://www.cbr-xml-daily.ru/daily_json.js')
  }
}
