import { SetMetadata } from '@nestjs/common';

export const ACTION_NAME = 'http-log-action-name';

export const ActionName = (name: string) => SetMetadata(ACTION_NAME, name);
