import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {Message, User} from '../../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  message: Message = { type: 'danger', text: '' }

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message.type = type
    this.message.text = text
    setTimeout(() => {
      this.message.text = ''
    },5000)
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if(user.email === formData.email) {
          if(user.password === formData.password) {
            //logic
          }
          else {
            this.showMessage("Пароль не верный")
          }
        } else {
          this.showMessage("Такого пользователя не существует")
        }
      })
  }
}
