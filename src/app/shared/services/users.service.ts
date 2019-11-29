import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../interfaces';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(public http: HttpClient) {}

  getUserByEmail(email: string): Observable<User>  {
    return this.http.get<User>(`http://localhost:3000/users?email=${email}`)
      .pipe(map((responce: User) => {
        return {
          //оператор spread разбивает массив responce на элементы в этом массиве
          //сразу после спред нас интересует нулевой элемент-объект
          //если он существует, возвращаем его, если нет, то undefined
          //условие ? значение1 : значение2
          ...responce[0] ? responce[0] : undefined
        }
      }))
  }
}
