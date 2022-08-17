import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

  tasks : TaskDto[] = [];

  create(@Body() task: TaskDto) : TaskDto {

    const newTask = {...task}

    this.tasks = [...this.tasks, newTask];

    return newTask;
  }

  findAll(): TaskDto[] {
    return this.tasks;
  }

  findOne(id: number): TaskDto {
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  update(id: number, task: TaskDto): TaskDto {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasks = [...this.tasks, task];
    return task;
  }

  remove(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);

    return this.tasks;
  }
}
