import { Component } from '@angular/core';
import { IPost } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //post: IPost;
  tempImages: string[] = [];
  cargandoGeolocation = false;

  constructor(
    private _postService: PostsService,
    private _uIService: UiService,
    private _route: Router,
    private _geolocation: Geolocation,
    private _camera: Camera) { }

  post = {
    message: "",
    coordenadas: "",
    position: false
  }

  async crearPost() {

    let postCreado = await this._postService.createPost(this.post);
    this.tempImages = [];
    /*this.post = {
      message: "",
      coordenadas: "",
      position: false
    }*/

    if (!postCreado) {
      this._uIService.presentInfoAlert("Post no fue creado");
    }
    else {
      console.log("TAB 2CREADOOOO POST ", this.post);
      this._route.navigateByUrl('main/tabs/tab1')
    }


  }

  getGeolocation() {
    console.log("GEO: ", this.post);

    if (!this.post.position) {
      this.post.coordenadas = null;
      return;
    }

    this.cargandoGeolocation = true;


    //Load geolocation
    this._geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      let coords = `${resp.coords.latitude},${resp.coords.longitude}`
      console.log("COORDENADAS: ", coords)
      this.post.coordenadas = coords;
      this.cargandoGeolocation = false;

    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeolocation = false;
    });
  }

  camera() {

    console.log("CAMERA inicio: ", this.tempImages);
    const options: CameraOptions = {
      quality: 60,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.CAMERA
    }

    this.procesarImagen(options);


  }

  procesarImagen(options: CameraOptions) {
    this._camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;

      //Path image
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log("PATH: ", img);
      this._postService.uploadFile(imageData);

      this.tempImages.push(img);
    }, (err) => {
      // Handle error
      console.log("ERROR CAMERA: ", err)
    });


  }

  galeria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImagen(options);
  }
}
