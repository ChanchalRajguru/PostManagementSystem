import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  //Subjects help us to create objects that can distribute data.
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  // return an object that we can listen but can't emit outside.
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    // Updates the post
    this.posts.push(post);

    this.postsUpdated.next([...this.posts]);
  }
}
