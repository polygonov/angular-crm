import { Component, OnInit } from '@angular/core';
import {User} from '../../../../shared/interfaces';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date()
  user: User

  constructor(
    private authServece: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'))
  }

  onLogout() {
    this.authServece.logout()
    this.router.navigate(['/login'])
  }
}
