import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { IUser } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskboardId: string | null = null;
  users: IUser[] = [];
  priorities: string[] = ['Low', 'Medium', 'High', 'Stuck'];
  userList = new FormControl<IUser[]>([]);

  @Output() taskAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ){}

  ngOnInit(){

    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
    });

    this.activatedRoute.queryParams.subscribe((val) => {
      this.taskboardId = val['taskboardId'];
    });

    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });

  }

  addTask() {
    const newTask: ITask = {
      status: 'To Do',
      title: this.taskForm.value.task,
      assignedDate: new Date(),
      dueDate: this.taskForm.value.date,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      done: false,
      taskboardId: this.taskboardId
    };

    this.taskService.addTask(newTask).subscribe({
      next: (response) => {
        const taskId = response['taskId'];
        if (taskId) {
          this.addUserTask(taskId);
          console.log("Task added and user assigned.");
          this.taskAdded.emit();
        } else {
          console.error('Task ID is undefined');
        }
      },
    });

    this.taskForm.reset();
  }

  addUserTask(taskId: string) {
    const selectedUsers = this.userList.value;

    if (selectedUsers && selectedUsers.length > 0) {
      const selectedUserIds = selectedUsers
        .map((user) => user.userId)
        .filter((userId): userId is string => userId !== undefined);

      this.userService.deleteUsersFromTask(taskId).subscribe({
        next: () => {
          this.userService.addUserTasks(selectedUserIds, taskId).subscribe({
            next: (response) => {
              // Task assignment logic here
            },
            error: (error) => {
              console.error('Error adding user tasks:', error);
            },
          });
        },
        error: (error) => {
          console.error('Error deleting existing user tasks:', error);
        },
      });
    }
    this.userList.reset();
  }



}