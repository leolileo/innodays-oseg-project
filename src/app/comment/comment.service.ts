import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { Http, Response } from '@angular/http';

@Injectable()
export class CommentService {
  private commentsUrl = '/api/main';

  constructor (private http: Http) {}

  // get("/api/main")
  getComments(): Promise<void | Comment[]> {
    return this.http.get(this.commentsUrl)
      .toPromise()
      .then(response => response.json() as Comment[])
      .catch(this.handleError);
  }

  // post("/api/main")
  createComment(newComment: Comment): Promise<void | Comment> {
    return this.http.post(this.commentsUrl, newComment)
      .toPromise()
      .then(response => response.json() as Comment)
      .catch(this.handleError);
  }

  // get("/api/main/:id") endpoint not used by Angular app

  // delete("/api/main/:id")
  deleteComment(delCommentId: String): Promise<void | String> {
    return this.http.delete(this.commentsUrl + '/' + delCommentId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/main/:id")
  updateComment(putComment: Comment): Promise<void | Comment> {
    const putUrl = this.commentsUrl + '/' + putComment._id;
    return this.http.put(putUrl, putComment)
      .toPromise()
      .then(response => response.json() as Comment)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
