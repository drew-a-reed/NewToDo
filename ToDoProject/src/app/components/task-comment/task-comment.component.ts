import { Component, Input, OnInit } from '@angular/core';
import { ITaskComment } from './../../models/task-comment.model';
import { TaskCommentService } from 'src/app/services/task-comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss']
})
export class TaskCommentComponent implements OnInit {
  taskComments: ITaskComment[] = [];
  userId: string | null = null;


  @Input() taskId?: string;

  constructor(
    private taskCommentService: TaskCommentService,
    private auth: AuthService,
  ){}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();

    if(this.taskId){
      this.taskCommentService.getAllComments(this.taskId).subscribe((response) => {
        this.taskComments = response;
      })
    }

  }

  getBackgroundColor(userId: string): string {

    if(userId == this.userId){
      return '#000';
    } else {
      return '#111';
    }

  }

}
