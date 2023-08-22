import { PrismaService } from '@app/prisma';
import { PrismaGenericRepository } from '@asaje/prisma-generic-repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { Auth, Prisma } from '@prisma/client';

import { AuthAction, AuthErrorStatus } from './auth.enum';
import { HandleError } from '@app/decorators';
import { compare, hash } from 'bcrypt';
import { sign, verify } from '@asaje/token-generator';
import { Env } from '@app/shared';
import {
  BasicAuthCredentials,
  BasicAuthRegister,
  BasicAuthSetPassword,
} from './auth.dto';
import { AuthMessages, AuthViews } from './auth.constants';
import { EmailService } from '@app/email';

@Injectable()
export class AuthService extends PrismaGenericRepository<
  Prisma.AuthDelegate<any>,
  Auth,
  Prisma.AuthUncheckedCreateInput,
  Prisma.AuthUncheckedUpdateInput,
  Prisma.AuthWhereInput,
  Prisma.AuthSelect
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {
    super();
    this.model = this.prisma.auth;
  }

  async handleUsernameAlreadyExists(username: string) {
    const _username = await this.get({ username });

    if (_username)
      throw new ConflictException(AuthErrorStatus.USERNAME_ALREADY_EXISTS);
  }

  async handleEmailAlreadyExists(email: string) {
    const _email = await this.get({ email });

    if (_email)
      throw new ConflictException(AuthErrorStatus.EMAIL_ALREADY_EXISTS);
  }

  @HandleError()
  async register({ email, username, role }: BasicAuthRegister) {
    this.handleEmailAlreadyExists(email);
    this.handleUsernameAlreadyExists(username);

    return await this.create({
      email,
      role,
      ...(username ? { username } : {}),
    });
  }

  @HandleError()
  async setPassword({ id, password }: BasicAuthSetPassword) {
    const hashedPassword = await hash(password, 3);

    return await this.update(id, { password: hashedPassword });
  }

  @HandleError()
  async login({ email, username, password }: BasicAuthCredentials) {
    const user = await this.get({ OR: [{ email }, { username }] });

    if (!user || !(await compare(password, user.password))) {
      return null;
    }

    const token = sign({
      key: Env.auth.tokenSecret,
      data: { id: user.id },
      expiresIn: Env.auth.tokenExpiration,
    });

    return {
      token,
      credentials: {
        email: user.email,
        username: user.username,
        id: user.id,
        role: user.role,
      },
    };
  }

  async generateAndSendUrl(
    host: string,
    auth: Auth,
    action: AuthAction,
    template: string,
  ) {
    const url = `${host}/auth/${AuthViews.definePassword}/${auth.id}`;

    await this.email.sendEmail({
      subject: AuthMessages[action],
      to: auth.email,
      template,
      data: {
        username: auth.username ? auth.username : auth.email.split('@')[0],
        url,
      },
    });

    return { auth: { ...auth, password: undefined }, url };
  }

  @HandleError()
  async whoAmI(token: string) {
    const { id } = verify<{ id: string }>({ key: Env.auth.tokenSecret, token });
    const auth = await this.getById(id);
    delete auth.password;
    return auth;
  }
}
