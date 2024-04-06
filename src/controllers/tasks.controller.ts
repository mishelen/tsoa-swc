import { Body, Controller, Path, Post, Patch, Route, SuccessResponse } from 'tsoa';

export type TaskStatus = 'proposed' | 'inprgress' | 'done';

export interface CreateTaskDTO {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskStatusDTO {
  status: TaskStatus;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

@Route('tasks')
export class TasksController extends Controller {
  private tasks: Task[] = [];

  @Post()
  @SuccessResponse(202, 'Accepted')
  async createTask(@Body() body: CreateTaskDTO) {
    this.tasks.push({ id: Date.now(), ...body });
  }

  @Patch('{taskId}')
  @SuccessResponse(200)
  async updateTaskStatus(@Path() taskId: number, @Body() { status }: UpdateTaskStatusDTO) {
    const task = this.tasks.find(({ id }) => id === taskId);
    if (!task) {
      throw new Error();
    }
    task.status = status;
  }
}
