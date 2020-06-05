import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})


export class PostComponent implements OnInit {

  @Input() post : IPost;

  swCoordenadasNulas = true;
  HOST = environment.url;

  img1 = '/assets/perro-1.jpg'
  img2 = '/assets/perro-2.jpg'
  img3 = '/assets/perro-3.jpg'
    
  

  constructor() { }

  ngOnInit() {

    let url = `${this.HOST}/api/post/file/${this.post.imgs[0]}`
    console.log("URLIMA: ", url);
   
    if (this.post.coordenadas ==null){
      console.log("coordenadas nulas")
      
    }
    else{
      this.swCoordenadasNulas = false;

    }
  }

}
