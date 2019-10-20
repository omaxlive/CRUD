import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(public http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiHost);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${environment.apiHost}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.apiHost}/`, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.apiHost}/${post.id}`, post);
  }

}
