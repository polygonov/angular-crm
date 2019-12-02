import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../interfaces';
import {map} from 'rxjs/operators';
import {SettingsService} from "./settings.service";

@Injectable()
export class UsersService {
  constructor(
    public http: HttpClient,
    public settingsService: SettingsService
  ) {}

  getUserByEmail(email: string): Observable<User>  {
    return this.http.get(`${this.settingsService.baseUrl}users?email=${email}`)
      .pipe(map((responce) => {
        return {
          //оператор spread разбивает массив responce на элементы в этом массиве
          //сразу после спред нас интересует нулевой элемент-объект
          //если он существует, возвращаем его, если нет, то undefined
          //условие ? значение1 : значение2
          ...responce[0] ? responce[0] : undefined
        }
      }))
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.settingsService.baseUrl}users`, user)
  }
}
