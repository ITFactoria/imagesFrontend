import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRespuestaPosts, IPost } from "../interfaces/interfaces";


const HOST = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePost = 0;
  httpHeaders = new HttpHeaders({ 'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlYzUyZTM5MTJkOTI5MDJjNGExNzNlMyIsIm5hbWUiOiJydXBlcnRvIG1lbmEiLCJlbWFpbCI6InJ1cGVydG9AbWFpbCJ9LCJpYXQiOjE1OTA1OTY0NjksImV4cCI6MTU5MTIwMTI2OX0.LF5hGdw03RmzMPKRxViHsEJ9gI3HLUeEVjosM1gESm0' })

  respuesta: IRespuestaPosts;


  constructor(private _httpClient: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error);

  }

  getPosts() {

    this.pagePost++;
    
    return this._httpClient.get<IRespuestaPosts>(`${HOST}/api/post?page=${this.pagePost}`, {headers:  this.httpHeaders}).pipe(catchError(this.formatErrors));
    /*this._httpClient.get<IRespuestaPosts>(`${HOST}/api/post?page=${this.pagePost}}`, { headers: this.httpHeaders }).subscribe(respuesta => {
      console.log("Service res: ", respuesta);
      //return respuesta;
    });*/

    /*this.pagePost = 2;
    this._httpClient.get<IRespuestaPosts>(`${HOST}/api/post?page=${this.pagePost}`, { headers: this.httpHeaders }).subscribe(respuesta => {
      console.log("Service res: ", respuesta);
      //return respuesta;
    });*/





  }
}
