import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITaskComment } from '../models/task-comment.model';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  private baseUrlDev: string = 'https://localhost:7174/api/';
  private baseUrl: string = 'https://taskeeperapi.azurewebsites.net/api/';

  constructor(private http: HttpClient) {}

  getAllComments(taskId: string){
    return this.http.get<ITaskComment[]>(`${this.baseUrl}taskcomment/${taskId}`);
  }

  addComment(comment: ITaskComment) {
    return this.http.post<ITaskComment>(`${this.baseUrl}taskcomment`, comment);
  }

  // editComment(comment: ITaskComment) {
  //   return this.http.put<ITaskComment>(`${this.baseUrl}taskcomment/${comment.commentId}`, comment);
  // }

  deleteComment(commentId: number) {
    return this.http.delete<ITaskComment>(`${this.baseUrl}taskcomment/${commentId}`);
  }

}
