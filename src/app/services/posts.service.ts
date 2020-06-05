import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRespuestaPosts, IPost } from "../interfaces/interfaces";
import { UserService } from './user.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';



const HOST = environment.url;


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePost = 0;
  nuevoPost = new EventEmitter<IPost>()


  //httpHeaders = new HttpHeaders({ 'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlYzUyZTM5MTJkOTI5MDJjNGExNzNlMyIsIm5hbWUiOiJydXBlcnRvIG1lbmEiLCJlbWFpbCI6InJ1cGVydG9AbWFpbCJ9LCJpYXQiOjE1OTA1OTY0NjksImV4cCI6MTU5MTIwMTI2OX0.LF5hGdw03RmzMPKRxViHsEJ9gI3HLUeEVjosM1gESm0' })

  respuesta: IRespuestaPosts;


  constructor(
    private _httpClient: HttpClient, 
    private _usuarioService : UserService, 
    private _fileTransfer : FileTransfer) { }

  private formatErrors(error: any) {
    return throwError(error.error);

  }

  getPosts(pullToRequest: boolean = false) {

    let headers = new HttpHeaders({ 'x-token': this._usuarioService.token })
      

    if(pullToRequest){this.pagePost = 0}
    
    this.pagePost++;
    return this._httpClient.get<IRespuestaPosts>(`${HOST}/api/post?page=${this.pagePost}`, {headers: headers}).pipe(catchError(this.formatErrors));
    
  }

  createPost(post) {

    console.log("SERVICE CREATE POST", post)

    return new Promise(resolve => {
      
      let token = this._usuarioService.token;
      console.log("token: ", token)


      let headers = new HttpHeaders({ 'x-token': this._usuarioService.token })
      this._httpClient.post(`${HOST}/api/post/`, post, { headers: headers })
        .subscribe(res => {
          console.log("POST POST SERVICE", res)

          if (res['ok']) {
            console.log("POST EFECTUADI");
            this.nuevoPost.emit(res['post'])
            resolve(true)
          }
          else {
            console.log("POST MAMONA")
            resolve (false)
          }

        })


    })
  }

  uploadFile(img: string){

    console.log("POSTSERVICE imagedata: ", img)
    const options : FileUploadOptions ={
      fileKey : 'image',
      headers : { 'x-token' : this._usuarioService.token}
    }

    const fileTransfer : FileTransferObject = this._fileTransfer.create();
    fileTransfer.upload(img, `${HOST}/api/file/upload`, options)
    .then( data =>{
      console.log("DATA: ", data);
    })
    .catch(err=>{
      console.log("Err en Carga de archivo: ", err)
    })

  }

}
