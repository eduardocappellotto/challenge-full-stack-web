import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entitites/student.entity';
import { jwtConfig } from '../auth/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Student]),
    JwtModule.register(jwtConfig),
    ],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule { }
