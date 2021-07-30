import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth}
  }

  constructor(private _http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {

    if ( !localStorage.getItem('id')) {
        // return false;
        return of(false);  //version educativa == ??
    }

    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
               .pipe(
                 map( auth => {
                   this._auth = auth
                   return true;
                 })
               )

  }

  login(){
    console.log('hellloooo')
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
           .pipe(
             tap( auth => this._auth = auth),
             tap( auth => localStorage.setItem('id',auth.id))
           )
  }

  logout(){
    localStorage.removeItem('id');
    this._auth = undefined;
  }

}
