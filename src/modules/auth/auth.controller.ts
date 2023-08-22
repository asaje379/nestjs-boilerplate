import {
  Body,
  ClassSerializerInterceptor,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Render,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthViews } from './auth.constants';
import { CurrentHost } from '@app/decorators';
import {
  BasicAuthCredentials,
  BasicAuthId,
  BasicAuthRegister,
  BasicAuthSetPassword,
} from './auth.dto';
import { AuthAction } from './auth.enum';
import { AuthEntity } from './auth.entity';
import { Pagination } from '@app/shared/types/pagination';
import { SecureController } from '@app/decorators/secure-controller.decorator';
import { CurrentAuth } from '@app/decorators/current-auth.decorator';
import { Auth } from '@prisma/client';

@SecureController('auth', 'Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: BasicAuthRegister, @CurrentHost() host: string) {
    const auth = await this.authService.register(data);

    return await this.authService.generateAndSendUrl(
      host,
      auth,
      AuthAction.DEFINE_PASSWORD,
      'define-your-password',
    );
  }

  @ApiExcludeEndpoint()
  @Get(AuthViews.definePassword + '/:id')
  @Render(AuthViews.definePassword)
  definePasswordView() {
    return {};
  }

  @Post(AuthViews.setPassword)
  @Render(AuthViews.setPassword)
  async setPassword(@Body() data: BasicAuthSetPassword) {
    const auth = await this.authService.setPassword(data);
    if (!auth) throw new NotFoundException('Unable to set password');
    return { success: true };
  }

  @Post('login')
  async login(@Body() data: BasicAuthCredentials) {
    const authInfo = await this.authService.login(data);
    if (!authInfo) throw new UnauthorizedException('Invalid credentials');
    return authInfo;
  }

  @Post(AuthViews.resetPassword)
  async resetPassword(
    @Body() { email, username }: BasicAuthId,
    @CurrentHost() host: string,
  ) {
    const auth = await this.authService.get({ OR: [{ email, username }] });
    if (!auth)
      throw new NotFoundException('Unable to reset password, user not found');

    return this.authService.generateAndSendUrl(
      host,
      auth,
      AuthAction.RESET_PASSWORD,
      'reset-your-password',
    );
  }

  @Get()
  async findAll(@Query() args: Pagination) {
    const auths = await this.authService.findAndCount({ paginationArgs: args });
    return {
      ...auths,
      values: auths.values.map((auth) => ({ ...auth, password: undefined })),
    };
  }

  @Get('me')
  async whoAmI(@CurrentAuth() auth: Partial<Auth>) {
    return auth;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string) {
    const auth = await this.authService.getById(id);
    if (!auth) throw new NotFoundException();

    return new AuthEntity(auth);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() data: BasicAuthRegister) {
    const auth = await this.authService.update(id, data);
    if (!auth) throw new NotFoundException();

    return new AuthEntity(auth);
  }

  @Delete(':id')
  async archiveOne(@Param('id') id: string) {
    return await this.authService.archive(id);
  }

  @Delete(':id/force')
  async deleteOne(@Param('id') id: string) {
    return await this.authService.delete(id);
  }

  @Delete(':id/many')
  async archiveMany(@Body() ids: string[]) {
    return await this.authService.archiveMany(ids);
  }

  @Delete(':id/many/force')
  async deleteMany(@Body() ids: string[]) {
    return await this.authService.deleteMany(ids);
  }
}
