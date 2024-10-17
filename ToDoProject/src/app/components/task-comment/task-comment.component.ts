import { Component, Input, OnInit } from '@angular/core';
import { ITaskComment } from './../../models/task-comment.model';
import { TaskCommentService } from 'src/app/services/task-comment.service';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss']
})
export class TaskCommentComponent implements OnInit {
  taskComments: ITaskComment[] = [];

  @Input() taskId?: string;

  constructor(
    private taskCommentService: TaskCommentService
  ){}

  ngOnInit(): void {

    if(this.taskId){
      this.taskCommentService.getAllComments(this.taskId).subscribe((response) => {
        console.log('api', response);
        this.taskComments = response;
        console.log('taskComments:', this.taskComments);
      })
    }

  }

}
