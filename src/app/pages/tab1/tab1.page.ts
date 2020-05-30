import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: IPost[] = [];
  infScrollStatus : boolean;
  pullToRequest : boolean;


  constructor(private _postsService: PostsService) { }
  
  ngOnInit() {
    this.loadPosts();
    this._postsService.nuevoPost.subscribe(post=>{
      console.log("POST a UNSHIFT: ", post)
      this.posts.unshift(post)
    })
  }

  doRefresh(event){
    this.posts =[];
    this.infScrollStatus = true;
    this.pullToRequest = true;
    this.loadPosts(event, this.pullToRequest)

  }

  loadPosts(event?, pullToRequest: boolean = false) {

    this._postsService.getPosts(pullToRequest).subscribe(res => {
      console.log("TAB! Posts: ", res)
      this.posts.push(...res.posts);

      if (event) {
        event.target.complete();
        if (res.posts.length === 0) {
          this.infScrollStatus   = false;
          //event.target.disabled = true;
        }

      }
    })

  }

}
