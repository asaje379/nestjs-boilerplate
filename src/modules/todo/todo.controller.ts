import { GenericController } from '@app/base-controller';
import { TodoService } from './todo.service';
import { ActionName, SecureController } from '@app/decorators';
import { Body, Param, Patch, Post } from '@nestjs/common';
import { CreateTodo } from './todo.dto';

@SecureController('todos', 'Manage todos')
export class TodoController extends GenericController<TodoService> {
  constructor(protected readonly service: TodoService) {
    super(service);
  }

  @Post()
  @ActionName('Create new todo with label')
  async createTodo(@Body() { label }: CreateTodo) {
    return await this.service.create({ label, completed: false });
  }

  @Patch(':id/toggle')
  @ActionName('Toggle todo status')
  async toggleTodoStatus(@Param('id') id: string) {
    const todo = await this.service.getById(id);
    return await this.service.update(id, { completed: !todo.completed });
  }
}
