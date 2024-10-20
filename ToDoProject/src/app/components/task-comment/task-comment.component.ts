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
    private auth: AuthService
    ){}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();

    if(this.taskId){
      this.taskCommentService.getAllComments(this.taskId).subscribe((response) => {
        this.taskComments = response;
      })
    }

  }

  isUserComment(comment: ITaskComment): boolean {
    return this.userId === comment.userId;
  }
  onCommentAdded() {
    if(this.taskId){
      this.taskCommentService.getAllComments(this.taskId).subscribe((response) => {
        this.taskComments = response;
      })
    }
  }

  deleteComment(commentId: number | undefined) {
    if (commentId !== undefined) {
      this.taskCommentService.deleteComment(commentId).subscribe(
        () => {
          if (this.taskId) {
            this.taskCommentService.getAllComments(this.taskId).subscribe((response) => {
              this.taskComments = response;
            });
          }
        },
        (error) => {
          if (this.taskId) {
            this.taskCommentService.getAllComments(this.taskId).subscribe((response) => {
              this.taskComments = response;
            });
          }
          console.error('Error deleting comment:', error);
        }
      );
    } else {
      console.error('Comment ID is undefined');
    }
  }

  getBackgroundColor(userId: string): string {

    if(userId == this.userId){
      return '#000';
    } else {
      return '#160989';
    }

  }

  getCommenter(userId: string): string {
    if(userId == this.userId){
      return 'flex-start';
    } else {
      return 'flex-end';
    }
  }

}
