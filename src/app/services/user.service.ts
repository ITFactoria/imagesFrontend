import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ILogin, IUser } from "../interfaces/interfaces";
import { Storage } from '@ionic/storage';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  HOST = environment.url;
  token: string = null;


  constructor(private httpClient: HttpClient, private _storage: Storage) { }

  private formatErrors(error: any) {
    return throwError(error.error);

  }

  login(email: string, password: string) {
    console.log("USER login ", email, "", password);

    return new Promise(resolve=>{
      this.getToken(email, password).subscribe(res => {
        console.log('res: ', res);
        console.log('res: ', res.token);
  
        if (res.ok == true) {
          console.log("OK")
          this.token = res.token;
          this._storage.set('token', this.token);
          resolve(true);
        }
        else {
          console.log("BAD")
          this.token = null;
          this._storage.clear()
          resolve(false)
        }
      }, err => {
        console.log("error: ", err)
      })

    })
  
  }

  signUp(user: IUser){

    return new Promise(resolve=>{
      this.httpClient.post(`${this.HOST}/api/user`, user)
      .pipe(catchError(this.formatErrors))
      .subscribe(res=>{
        console.log('SIGNUP service: ', res)
        if (res["ok"] == true) {
          console.log("OK")
          this.token = res['token'];
          this._storage.set('token', this.token);
          resolve(true);
        }
        else {
          console.log("BAD")
          this.token = null;
          this._storage.clear()
          resolve(false)
        }

      })
    })

  }

  getToken(email: string, password: string) {

    let userData = { email, password }
    return this.httpClient.post<ILogin>(`${this.HOST}/api/user/login`, userData)
      .pipe(catchError(this.formatErrors))

  }




}
