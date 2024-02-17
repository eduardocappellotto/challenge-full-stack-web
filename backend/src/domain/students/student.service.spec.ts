import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entitites/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { NotFoundException } from '@nestjs/common';



describe('StudentService', () => {
    let service: StudentService;
    let repository: Repository<Student>;

    let mockStudent = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123.456.789-00',
        ra: '123456'
    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StudentService,
                {
                    provide: getRepositoryToken(Student),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<StudentService>(StudentService);
        repository = module.get<Repository<Student>>(getRepositoryToken(Student));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a student', async () => {
            const createStudentDto: CreateStudentDto = mockStudent;
            const student = new Student();
            jest.spyOn(repository, 'create').mockReturnValue(student);
            jest.spyOn(repository, 'save').mockResolvedValue(student);

            const result = await service.create(createStudentDto);

            expect(result).toBe(student);
        });
    });

    describe('findAll', () => {
        it('should return an array of students', async () => {
            const students = [mockStudent, mockStudent];
            jest.spyOn(repository, 'find').mockResolvedValue(students);

            const result = await service.findAll();

            expect(result).toEqual(students);
        });
    });

    describe('findOne', () => {
        it('should return a student by RA', async () => {
            const ra = '123456';
            const student = new Student();
            jest.spyOn(repository, 'findOne').mockResolvedValue(student);

            const result = await service.findOne(ra);

            expect(result).toBe(student);
        });

        it('should throw NotFoundException if student with RA is not found', async () => {
            const ra = 'nonexistent_ra';
            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            expect(service.findOne(ra)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a student by RA', async () => {
            const ra = '123456';
            const updateStudentDto: UpdateStudentDto = { /* Fill with mock data */ };
            const student = new Student();
            jest.spyOn(repository, 'findOne').mockResolvedValue(student);
            jest.spyOn(repository, 'save').mockResolvedValue(student);

            const result = await service.update(ra, updateStudentDto);

            expect(result).toBe(student);
        });
    });

    describe('remove', () => {
        it('should remove a student by RA', async () => {
            const ra = '123456';
            jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

            const result = await service.remove(ra);

            expect(result).toBe(undefined);
        });
    });
});