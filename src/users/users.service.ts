import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInterface } from './interfaces/user.interface';
import { catchError, lastValueFrom, of } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('EMC_ACCOUNTS') private readonly emcAccounts: ClientProxy,
  ) {}

  async verifyUser(jwtToken: string): Promise<UserInterface> {
    const user: UserInterface & { error: string } = await lastValueFrom(
      this.emcAccounts
        .send({ cmd: 'auth.verifyUser' }, { jwtToken })
        .pipe(catchError((e) => of({ error: e.message }))),
    );

    if (user.error) {
      throw new ForbiddenException(user.error);
    }
    return user;
  }
}
