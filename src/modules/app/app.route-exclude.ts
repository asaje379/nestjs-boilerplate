import { RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

export const routesToExclude: (string | RouteInfo)[] = [
  { path: '/events', method: RequestMethod.GET },
  { path: '/healthy', method: RequestMethod.GET },
  { path: '/test-(.*)', method: RequestMethod.GET },
  { path: '/auth/login', method: RequestMethod.POST },
  { path: '/auth/register', method: RequestMethod.POST },
  { path: '/auth/reset-password', method: RequestMethod.POST },
  { path: '/auth/set-password', method: RequestMethod.POST },
  { path: '/auth/define-password/(.*)', method: RequestMethod.GET },
];
