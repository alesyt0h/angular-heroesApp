import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( private _router: Router,
               private _authService: AuthService ) { }

  login(){

    // Ir al backend
    // un usuario en un servicio
    
    this._authService.login().subscribe( resp => {
      console.log(resp);

      if (resp.id) {
        this._router.navigate(['./heroes'])

      }
    })
  }

  IngresarSinLogin() {
    this._authService.logout()
    this._router.navigate(['./heroes'])
  }


}
