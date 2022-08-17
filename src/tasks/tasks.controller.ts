import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() task: TaskDto, @Res() res: Response) {
    const newTask = this.tasksService.create(task);

    return res.status(HttpStatus.CREATED).json({
      message: 'New task created successfully',
      newTask
    });
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const task = this.tasksService.findOne(+id);

    if (!task) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Not Found id ${id}`,
      });
    }

    return res.status(HttpStatus.OK).json({
      task
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: TaskDto, @Res() res: Response) {
    const updateTask = this.tasksService.update(+id, task);

    return res.status(HttpStatus.OK).json({
      message: 'Task updated successfully',
      updateTask
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const task = this.tasksService.remove(+id);

    if (!task) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Not Found id ${id}`,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Task deleted successfully',
    });
  }
}
