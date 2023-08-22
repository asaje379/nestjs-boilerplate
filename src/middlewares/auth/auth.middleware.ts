import { ExecutionRequest } from '@app/shared';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: ExecutionRequest, _: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization.startsWith('Bearer')) {
        throw new UnauthorizedException();
      }

      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }

      const auth = await this.authService.whoAmI(token);
      req.auth = auth;

      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
