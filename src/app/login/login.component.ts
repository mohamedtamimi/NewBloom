import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
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

  constructor(public router: Router,private authService:AuthService,public messageService?: MessageService,){
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

  login() {
    if (!this.password || !this.username) return this.messageService?.add({ severity: 'error', detail: 'من فضلك إدخل جميع المعلومات المطلوبة' });

    this.authService.login(this.username, this.password).subscribe((user: any) => {

      sessionStorage.setItem('userAuth', JSON.stringify(user))
      this.router?.navigate(['/dashboard']);
      setTimeout(() => {
        location.reload()

      }, 1000);
    }, error => {
    
      console.log(error);
    })
  }

}
