import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from './../../models/task';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
})
export class TaskboardComponent implements OnInit {
  taskboardId: string | null = null;
  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  stuck: ITask[] = [];
  statuses: string[] = ['To Do', 'In Progress', 'Done', 'Stuck'];
  user: IUser | undefined;
  users: IUser[] = [];
  taskUserMap: { [taskId: string]: IUser[] } = {};

  @ViewChild('newTaskComponent') newTaskComponent: NewTaskComponent | undefined;
  @Output() taskEdit = new EventEmitter<ITask>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((val) => {
      this.taskboardId = val['taskboardId'];
    });

    if (this.taskboardId) {
      this.getAllTasks(this.taskboardId);
    }

    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  getAllTasks(taskboardId: string) {
    this.taskService.getAllTasks(taskboardId).subscribe((response) => {
      this.tasks = response;

      this.tasks.forEach((task) => {
        if (task['taskId'] !== undefined) {
          this.userService
            .getAssignedUsersForTask(task['taskId'])
            .subscribe((users) => {
              if (task['taskId'] !== undefined) {
                this.taskUserMap[task['taskId']] = users;
              }
            });
        }
      });
    });
  }

  onTaskAdded() {
    if (this.taskboardId) {
      this.getAllTasks(this.taskboardId);
    }
  }

  deleteTask(task: ITask) {

    if (task['taskId']) {
      this.taskService.deleteTask(task['taskId']).subscribe(
        () => {
          this.tasks = this.tasks.filter((t) => t.taskId !== task['taskId']);
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    } else {
      console.error('Task ID is undefined');
    }
  }

  onEditTask(task: ITask): void {
    this.taskEdit.emit(task);
    if (this.newTaskComponent) {
      this.newTaskComponent.editTask(task);
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'Low':
        return '#238240';
      case 'Medium':
        return '#fce803';
      case 'High':
        return '#B3180C';
      default:
        return '#000';
    }
  }

  drop(event: CdkDragDrop<ITask[]>, category: string) {
    let targetArray: ITask[] = [];
    let status: string;

    switch (category) {
      case 'To Do':
        targetArray = this.tasks;
        status = 'To Do';
        break;
      case 'In Progress':
        targetArray = this.inProgress;
        status = 'In Progress';
        break;
      case 'Done':
        targetArray = this.done;
        status = 'Done';
        break;
      case 'Stuck':
        targetArray = this.stuck;
        status = 'Stuck';
        break;
      default:
        return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      movedTask.status = status;

      transferArrayItem(
        event.previousContainer.data,
        targetArray,
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.updateTask(movedTask).subscribe({
        next: (response) => {
          if (this.taskboardId) {
            this.getAllTasks(this.taskboardId);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
