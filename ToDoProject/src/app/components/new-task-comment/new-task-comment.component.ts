import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { TaskCommentService } from 'src/app/services/task-comment.service';
import { ITaskComment } from 'src/app/models/task-comment.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-task-comment',
  templateUrl: './new-task-comment.component.html',
  styleUrls: ['./new-task-comment.component.scss']
})
export class NewTaskCommentComponent implements OnInit {
  taskCommentForm!: FormGroup;
  userId: string | null = null;
  userName: string | null = null;

  @Input() taskId?: string;
  @Output() commentAdded = new EventEmitter<void>();


  constructor(
    private taskCommentService: TaskCommentService,
    private fb: FormBuilder,
    private auth: AuthService
    ){}

  ngOnInit(){
    this.userId = this.auth.getUserId();
    this.userName = this.auth.getFullNameFromToken();

    this.taskCommentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  addComment() {
    const newComment: ITaskComment = {
      userId: this.userId || '',
      taskId: this.taskId || '',
      userName: this.userName || '',
      comment: this.taskCommentForm.value.comment,
      createdDate: new Date()
    }

    this.taskCommentService.addComment(newComment).subscribe({
      next: (response) => {
        console.log('Comment added successfully:', response);
        this.commentAdded.emit();
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      },
    });
  }

}
