import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../../../shared/services/settings.service";
import {Category} from "../../../shared/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
    public settingsService: SettingsService
  ) { }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.settingsService.baseUrl}categories`, category)
  }

}
