import { Component } from '@angular/core';

import { Post } from './posts/post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
   storedPosts: Post[] = [];

  /* When onPostAdded() is called, the formatting of post is done by the
  event (postCreated) present in post-create.component.ts file    */
  onPostAdded(post) {
    // It is recieving this post from the app.component.html file
    // Pushing push() the post recieved from the user to the storedPost array declared above
      this.storedPosts.push();
  }
}
