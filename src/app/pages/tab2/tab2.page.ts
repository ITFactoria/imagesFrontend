import { Component } from '@angular/core';
import { IPost } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //post: IPost;
  tempImages: string[];
  loadGeo = false;

  constructor(
    private _postService: PostsService, 
    private _uIService: UiService, 
    private _route: Router, 
    private _geolocation: Geolocation) { }

  post = {
    message: "",
    coordenadas: "",
    position: false



  }

  async crearPost() {

    console.log("TAB 2CREAR POST ", this.post);
    let postCreado = await this._postService.createPost(this.post);
    

    if (!postCreado) {
      this._uIService.presentInfoAlert("Post no fue creado");
    }
    else {
      console.log("TAB 2CREADOOOO POST ", this.post);
    
      /*this.post = {
        message: "",
        coordenadas: "",

      }*/
      this._route.navigateByUrl('main/tabs/tab1')
    }


  }

  getGeo(){
    console.log("GEO: ", this.post);
    if(!this.post.position){
      this.post.coordenadas = null;
      return;
    }
    this.loadGeo = true;


    this._geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("ALTITUD", resp.coords.altitude)
      let coords =`${resp.coords.latitude},${resp.coords.longitude}`
      console.log("COORDENADAS: ", coords)
      this.post.coordenadas = coords;
      this.loadGeo = false;


      
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loadGeo = false;
 
     });
    

  }

}
