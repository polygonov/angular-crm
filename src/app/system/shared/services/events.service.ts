import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../../shared/services/settings.service';
import {CRMEvent} from '../../../shared/interfaces';
import {Observable} from 'rxjs';

@Injectable()
export class EventsService {
  constructor(
    public http:HttpClient,
    public settingsService: SettingsService
  ) { }

  addEvent(event: CRMEvent): Observable<CRMEvent> {
    return this.http.post<CRMEvent>(`${this.settingsService.baseUrl}events`, event)
  }
}
