import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor ( private _authService: AuthService,
                private _router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   if (this._authService.auth.id ) {
    //     return true
    //   }

    // console.log('Bloqueado por el Auth Guard - CanActivate')
    // return false;
    return this._authService.verificaAutenticacion()
               .pipe(
                 tap( estaAutenticado => {
                   if ( !estaAutenticado ) {
                      console.log('Bloqueado por el Auth Guard - CanActivate')
                     this._router.navigate(['./auth/login'])
                   }
                  })
               );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this._authService.verificaAutenticacion()
                .pipe(
                  tap( estaAutenticado => {
                    if ( !estaAutenticado ) {
                      console.log('Bloqueado por el Auth Guard - CanLoad')
                      this._router.navigate(['./auth/login'])
                    }
                  })
                );

    //   if (this._authService.auth.id ) {
    //     return true
    //   }

    // console.log('Bloqueado por el Auth Guard - CanLoad')
    // return false;
  }
}
