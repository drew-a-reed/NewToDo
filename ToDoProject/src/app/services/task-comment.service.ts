import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITaskComment } from '../models/task-comment.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  private baseUrlDev: string = 'https://localhost:7174/api/';
  private baseUrl: string = 'https://taskeeperapi.azurewebsites.net/api/';

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllComments(taskId: string){
    return this.http.get<ITaskComment[]>(`${this.baseUrl}taskcomment/${taskId}`);
  }

  addComment(comment: ITaskComment) {
    console.log("servcice comment", comment);
    return this.http.post<ITaskComment>(`${this.baseUrl}taskcomment`, comment);
  }

  // editComment(comment: ITaskComment) {
  //   return this.http.put<ITaskComment>(`${this.baseUrl}taskcomment/${comment.commentId}`, comment);
  // }

  // deleteComment(commentId: string){
  //   return this.http.delete<ITaskComment>(`${this.baseUrl}taskcomment/${commentId}`)
  // }
}
