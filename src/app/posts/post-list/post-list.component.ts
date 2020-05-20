import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})

/* OnInit is a LifeCycle Hook provided by Angular, this hook is automatically executed when Angular
creates this component 'PostListComponent' */
/* OnInit is a contract that the class PostListComponent signs*/
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content : 'This is First post\'s content' },
  //   { title: 'Second Post', content : 'This is Second post\'s content' },
  //   { title: 'Third Post', content : 'This is Third post\'s content' }];

  // The posts array is recieving data from the <app-post-list> in app.component.html
  posts: Post[] = [];

  /* Whenever this componnet is not part of the DOM, the subscriptions that we setup in it are also not living anymore,
  so that it doesn't cause a memory leak. To do this we need to store the subscription in a new property called Subcription.
  And with the help of this we can unsubscribe to the subscription anytime we want.
  */
  private postsSub: Subscription;

  // Storing the posts service in the property of this file using the public keyword.
  constructor(public postsService: PostsService) {}

  /* this method is automatically executed when we access the PostListComponent class*/
  ngOnInit() {
    this.posts = this.postsService.getPosts();

    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        //the posts variable is equals to the posts recieved.
        this.posts = posts;
      });
  }

  // This method helps us to unsubscribe when the method is destroyed, to help prevent any memory leaks.
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
