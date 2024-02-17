import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    ra: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(11, 14)
    cpf: string;
}