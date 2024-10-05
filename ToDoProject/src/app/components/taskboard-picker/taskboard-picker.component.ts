import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITaskboard } from 'src/app/models/taskboard';
import { IUserTaskboard } from 'src/app/models/user-taskboard.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskboardService } from 'src/app/services/taskboard.service';
import { UserTaskboardService } from 'src/app/services/user-taskboard.service';

@Component({
  selector: 'app-taskboard-picker',
  templateUrl: './taskboard-picker.component.html',
  styleUrls: ['./taskboard-picker.component.scss']
})
export class TaskboardPickerComponent implements OnInit {
  loginForm!: FormGroup;
  userId: string | null = null;
  userTaskboard!: IUserTaskboard;
  taskboardId: string | null = null;
  taskboards: ITaskboard[] = [];
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'visibility_off';
  passwordState: string = 'Show';
  userRole: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private taskboardService: TaskboardService,
    private auth: AuthService,
    private userTaskboardService: UserTaskboardService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();

    this.userRole = this.auth.getRoleFromToken();


    if(this.userRole == 'Demo'){
      console.log("here");

      this.loginForm = this.formBuilder.group({
        taskboardName: ['Demo Taskboard', Validators.required],
        taskboardPassword: ['Password123!', Validators.required],
      });
    } else {
      this.loginForm = this.formBuilder.group({
        taskboardName: ['', Validators.required],
        taskboardPassword: ['', Validators.required],
      });
    }



    if (this.userId) {
      this.getAllTaskboards(this.userId);
    }
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'visibility') : (this.eyeIcon = 'visibility_off');
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.passwordState = 'Hide') : (this.passwordState = 'Show');
  }

  onTaskboardLogin() {
    if (this.loginForm.valid) {
      this.taskboardService.loginTaskboard(this.loginForm.value).subscribe({
        next: (response) => {
          this.taskboardId = response.taskboardId;
          this.userTaskboard = this.userTaskboard || {};
          if (this.taskboardId && this.userId) {
            this.userTaskboard.taskboardId = this.taskboardId;
            this.userTaskboard.userId = this.userId;
            this.userTaskboard.role = "User";
          }
          this.userTaskboardService.addUserToTaskboard(this.userTaskboard).subscribe({
            next: (response) => {
              console.log(response);
            }
          });
          this.loginForm.reset();
          this.router.navigate(['taskboard'], { queryParams: { taskboardId: this.taskboardId } });
        },
        error: (response) => {
          alert('Taskboard Name/password do not match.');
        },
      });
    } else {

    }
  }

  getAllTaskboards(userId: string) {
    this.userTaskboardService.getUserTaskboards(userId).subscribe((response) => {
      this.taskboards = response;
    });
  }
}
