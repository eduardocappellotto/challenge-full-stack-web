import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

    async findAll(page: number, perPage: number, search: string): Promise<{ students: Student[]; total: number }> {
        const skip = (page - 1) * perPage;
        const take = perPage;
        let whereClause = {};

        if (search) {
            whereClause = {
                where: [
                    { ra: Like(`%${search}%`) },
                    { name: Like(`%${search}%`) },
                    { email: Like(`%${search}%`) },
                    { cpf: Like(`%${search}%`) },
                ],
            };
        }

        const [students, total] = await this.studentRepository.findAndCount({ ...whereClause, skip, take });

        return { students, total }
    }

    async findOne(ra: string): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { ra } });
        if (!student) {
            throw new NotFoundException(`Student with RA '${ra}' not found`);
        }
        return student;
    }

    async update(ra: string, updateStudentDto: UpdateStudentDto): Promise<Student | undefined> {
        const student = await this.findOne(ra);
        Object.assign(student, updateStudentDto);
        return await this.studentRepository.save(student);
    }

    async remove(ra: string): Promise<void> {
        await this.studentRepository.softDelete(ra);
    }
}
