export interface ITaskComment {
  commentId?: number;
  userId: string;
  userName?: string;
  taskId: string;
  comment: string;
  createdDate: Date;
  lastModifiedDate?: Date;
}
