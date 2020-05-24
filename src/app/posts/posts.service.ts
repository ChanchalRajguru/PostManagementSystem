import { Post } from './post.model';
import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  //Subjects help us to create objects that can distribute data.
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }
  //Unsubscription is handled by angular for observables connected to the features built-in like HTTP.
  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=> {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  // return an object that we can listen but can't emit outside.
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id:null, title: title, content: content };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData)=> {
        console.log(responseData.message);
        // Updates the post
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }
}
