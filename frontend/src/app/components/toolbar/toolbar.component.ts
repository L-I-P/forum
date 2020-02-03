import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  get isLoggedIn() {
    return localStorage.getItem('name') !== null && localStorage.getItem('token') !== null;
  }
  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
