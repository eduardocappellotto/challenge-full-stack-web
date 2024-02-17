
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entitites/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) { }

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const student = this.studentRepository.create(createStudentDto);
        return await this.studentRepository.save(student);
    }

    async findAll(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async findOne(ra: string): Promise<Student | undefined> {
        return await this.studentRepository.findOne({ where: { ra } });
    }

    async update(ra: string, updateStudentDto: UpdateStudentDto): Promise<Student | undefined> {
        const student = await this.studentRepository.findOne({ where: { ra } });
        if (!student) {
            return undefined;
        }
        Object.assign(student, updateStudentDto);
        return await this.studentRepository.save(student);
    }

    async remove(ra: string): Promise<void> {
        await this.studentRepository.delete(ra);
    }
}
