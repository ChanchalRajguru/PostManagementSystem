import { Component, Input } from '@angular/core';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // posts = [
  //   { title: 'First Post', content : 'This is First post\'s content' },
  //   { title: 'Second Post', content : 'This is Second post\'s content' },
  //   { title: 'Third Post', content : 'This is Third post\'s content' }];

  // The posts array is recieving data from the <app-post-list> in app.component.html
  @Input() posts: Post[] = [];

  // Storing the posts service in the property of this file using the public keyword.
  constructor(public postsService: PostsService) {

  }

}
