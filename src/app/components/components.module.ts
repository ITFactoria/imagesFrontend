import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [PostComponent, PostsComponent, MapComponent],
  imports: [
    CommonModule, IonicModule, PipesModule
  ],
  exports:[
    PostsComponent
  ]
})
export class ComponentsModule { }
