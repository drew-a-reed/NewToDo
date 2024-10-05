import { Component, OnInit } from '@angular/core';
import {CdkDragDrop,moveItemInArray,transferArrayItem,} from '@angular/cdk/drag-drop';
import {FormGroup,FormBuilder,Validators,FormControl,} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from './../../models/task';


@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {
  taskboardId: string | null = null;
  tasks: ITask[] = [];
  statuses: string[] = ['To Do', 'In Progress', 'Done', 'Stuck'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
  ){}

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((val) => {
      this.taskboardId = val['taskboardId'];
    });

    if (this.taskboardId) {
      this.getAllTasks(this.taskboardId);
    }

  }

  getAllTasks(taskboardId: string){
    this.taskService.getAllTasks(taskboardId).subscribe((response) => {
      this.tasks = response;
      console.log(this.tasks);

    })
  }

  getBackgroundColor(priority: string): string {
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

}
