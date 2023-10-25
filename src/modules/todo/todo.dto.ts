import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, MinLength } from 'class-validator';

export class CreateTodo {
  @MinLength(3, { message: 'Todo label must contains at least 3 characters' })
  @ApiProperty()
  label: string;
}

export class ToggleTodo {
  @IsBoolean()
  @ApiProperty()
  completed: boolean;
}
