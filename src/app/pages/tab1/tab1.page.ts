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


  constructor(private _postsService: PostsService) { }

  ngOnInit() {
    this.loadPosts();
    //this._postsService.getPosts();



  }

  loadPosts(event?) {

    this._postsService.getPosts().subscribe(res => {
      console.log("tab res:", res);
      this.posts.push(...res.posts);

      if (event) {
        event.target.complete();
        console.log("leng: ", res.posts.length)

        if (res.posts.length === 0) {
          event.target.disabled = true;
        }

      }
    })

  }

}
