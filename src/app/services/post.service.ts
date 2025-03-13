import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private postsSignal  = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.postsSignal.set(data);
    });
  }

  getPosts() {
    return this.postsSignal.asReadonly();
  }
}