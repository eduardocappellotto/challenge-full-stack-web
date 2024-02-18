import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

import { User } from './domain/users/entitites/user.entity';
import { UserModule } from './domain/users/user.module';

import { AuthModule } from './domain/auth/auth.module';
import { StudentModule } from './domain/students/student.module';
import { Student } from './domain/students/entitites/student.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: String(appConfig().DB_USER),
      password: String(appConfig().DB_PASSWORD),
      database: appConfig().DB_NAME,
      entities: [User, Student],
      logging: true,
    }),
    AuthModule,
    UserModule,
    StudentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
