import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../models/task';

@Pipe({
  name: 'taskStatusFilter',
  pure: false
})
export class TaskStatusFilterPipe implements PipeTransform {

  transform(tasks: ITask[], status: string): ITask[] {
    return tasks.filter(task => task.status === status);
  }

}
