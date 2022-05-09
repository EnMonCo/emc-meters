import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { HomeModule } from './home/home.module';
import { MetersModule } from './meters/meters.module';
import { UsersModule } from './users/users.module';
import { UserMetersModule } from './user-meters/user-meters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    HomeModule,
    MetersModule,
    UsersModule,
    UserMetersModule,
  ],
})
export class AppModule {}
