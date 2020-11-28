import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  url = "https://localhost:44339/api/posts/";
  getPosts(page) {
    return this.http.get(this.url+"/"+page).pipe(
        map(response => response as JSON[]),
        catchError(err=> {return throwError(err);})
    );
  }
  
  getTotalPost(){
    return this.http.get(this.url).pipe(
        map(response=> response as number),
        catchError(err=>{return throwError(err)})
    );
  }

  getSearchedPosts(query){
    var params = {
      query: query
    };

    return this.http.get(this.url + "/" + 1,{params}).pipe(
      map(response=> {
       // response as JSON[];
       console.log("hell: "+ response);

      }),
      catchError(err=>{return throwError(err)})
    );
  }
}
