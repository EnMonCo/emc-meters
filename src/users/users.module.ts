import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'EMC_ACCOUNTS',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('app.EMC_ACCOUNTS_HOST'),
            port: configService.get<number>('app.EMC_ACCOUNTS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
