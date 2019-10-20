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

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(environment.apiHost);
  }

}
