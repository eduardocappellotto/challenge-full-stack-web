import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @Get(':ra')
  async findOne(@Param('ra') ra: string) {
    return this.studentService.findOne(ra);
  }

  @Put(':ra')
  async update(@Param('ra') ra: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(ra, updateStudentDto);
  }

  @Delete(':ra')
  async remove(@Param('ra') ra: string) {
    return this.studentService.remove(ra);
  }
}