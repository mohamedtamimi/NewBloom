import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;
  
  username: string;

  constructor(public router: Router){
    this.username = '';
    this.password = '';
   }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
  
  }

  Redirect()
  {
    if(this.username.toLowerCase() === 'admin' && this.password.toLowerCase() === '123') {
      this.router.navigateByUrl('/dashboard');
    }
   
  }

}
