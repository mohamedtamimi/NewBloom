import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private activatedRoute: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public activatedRouteEmitter: Observable<boolean> = this.activatedRoute.asObservable();

  constructor(private route: ActivatedRoute, private router: Router) {

  }
  authData = JSON.parse(sessionStorage.getItem('userAuth'))
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.authData) {
      return true;
    } else {      
      this.router.navigate(['/login'], {});
      return false;
    }

  }
}
