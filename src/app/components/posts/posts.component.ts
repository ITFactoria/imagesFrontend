import { Component, OnInit, Input } from '@angular/core';
import { IPost } from "../../interfaces/interfaces";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input() posts : IPost[] = [];

  constructor() { }

  
  ngOnInit() {
    console.log('POST: Posts: ', this.posts)
  }

}
