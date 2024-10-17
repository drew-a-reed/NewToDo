export interface ITaskComment {
  commentId: number;
  userId: string;
  taskId: string;
  comment: string;
  createdDate: Date;
  lastModifiedDate?: Date;
 }
