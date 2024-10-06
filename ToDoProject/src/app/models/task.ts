export interface ITask{
  taskId?: string,
  title?: string,
  description?: string,
  status: string,
  priority: string,
  done: boolean,
  assignedDate?: any,
  dueDate?: any,
  taskboardId: string | null,
}
