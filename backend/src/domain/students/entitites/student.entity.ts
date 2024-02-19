import { Entity, PrimaryColumn, Column, DeleteDateColumn } from 'typeorm';

const ENTITY_TABLE_NAME = "students"

@Entity({ name: ENTITY_TABLE_NAME })
export class Student {
    @PrimaryColumn({ length: 20 })
    ra: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 14 })
    cpf: string;

    @DeleteDateColumn()
    deletedat?: Date;
}
