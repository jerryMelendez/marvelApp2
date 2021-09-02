import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(
    private userService: UserService,
    ){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {  
    return this.userService.validToken(true);
  }
  
}
