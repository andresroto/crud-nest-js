import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TaskDto } from 'src/tasks/dto/task.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('tasks CRUD', async () => {

    const server = request(app.getHttpServer());

    // All tasks
    const currentGetAllRequest = await server.get('/tasks').expect(200);


    // Save task
    const newTask: TaskDto = {
      id: 1,
      title: 'my task',
      description: 'my task description',
      status: true,
      created_at: new Date('2022/08/15')
    }

    const newTaskRequest = await server.post('/tasks').type('form')
    .send(newTask).expect(201);

    expect((+newTaskRequest.body.newTask.id)).toBe(newTask.id);
    expect(newTaskRequest.body.newTask.title).toBe(newTask.title);
    expect(newTaskRequest.body.newTask.description).toBe(newTask.description);

   // Show task
    const id = newTaskRequest.body.newTask.id;
    // const getTaskByIdRequest = await server.get(`/tasks/${id}`).expect(200);

    // expect(getTaskByIdRequest.body.id).toBe(id);

    // Update task
    const updateTask: TaskDto = {
      id: newTaskRequest.body.newTask.id,
      title: 'my new task',
      description: 'my new description',
      status: true,
      created_at: new Date('2022/08/15')
    }

    const updateTaskRequest = await server.patch(`/tasks/${updateTask.id}`)
    .expect(200).type('form').send(updateTask);

    expect(updateTaskRequest.body.updateTask.title).toEqual(updateTask.title);

    // Delete task
    await server.delete(`/tasks/${updateTask.id}`)
    .expect(200);

    const postDeleteGetAllRequest = await server.get('/tasks')
    .expect(200);
  });
});
