import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/interfaces';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    })

  }

  onSubmit() {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name
    }

    this.usersService.createNewUser(user)
      .subscribe((user: User) => {
        window.localStorage.setItem('user', JSON.stringify(user))
        this.authService.login()
        this.router.navigate(['/system/bill'])

        //можно было передать query параметры в логин компонент, но смысла нет
        // this.router.navigate(['/login'], {
        //   queryParams: {
        //     param1: true
        //   }
        // })
      })
  }

  forbiddenEmails(control: FormControl): Promise<object | null> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user.email === control.value) {
            resolve({forbiddenEmail: true})
          } else {
            resolve(null)
          }
        })
    })
  }
}
