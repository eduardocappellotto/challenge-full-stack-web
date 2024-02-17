import { IsOptional, IsString, IsEmail, Length } from 'class-validator';

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(11, 14)
    cpf?: string;
}