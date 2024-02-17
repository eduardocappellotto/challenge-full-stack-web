import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentController', () => {

    let mockStudent = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123.456.789-00',
        ra: '123456'
    }

    let controller: StudentController;
    let studentService: StudentService;

    beforeEach(() => {
        studentService = new StudentService({} as any);
        controller = new StudentController(studentService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a student', async () => {
            const createStudentDto: CreateStudentDto = mockStudent;
            jest.spyOn(studentService, 'create').mockResolvedValue(createStudentDto);

            const result = await controller.create(createStudentDto);

            expect(result).toBe(mockStudent);
        });
    });

    describe('findAll', () => {
        it('should return an array of students', async () => {
            const students = [mockStudent, mockStudent];
            jest.spyOn(studentService, 'findAll').mockResolvedValue(students);

            const result = await controller.findAll();

            expect(result).toEqual(students);
        });
    });

    describe('findOne', () => {
        it('should return a student by RA', async () => {
            const ra = '123456';
            const student = mockStudent;
            jest.spyOn(studentService, 'findOne').mockResolvedValue(student);

            const result = await controller.findOne(ra);

            expect(result).toBe(student);
        });
    });

    describe('update', () => {
        it('should update a student by RA', async () => {
            const ra = '123456';
            const updateStudentDto: UpdateStudentDto = mockStudent;
            jest.spyOn(studentService, 'update').mockResolvedValue(mockStudent);

            const result = await controller.update(ra, updateStudentDto);

            expect(result).toBe(mockStudent);
        });
    });

    describe('remove', () => {
        it('should remove a student by RA', async () => {
            const ra = '123456';
            jest.spyOn(studentService, 'remove').mockResolvedValue();
            await controller.remove(ra);
            expect(studentService.remove).toHaveBeenCalledWith('123456');
        });
    });
});
