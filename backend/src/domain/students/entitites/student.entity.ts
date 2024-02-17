import { Entity, PrimaryColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
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
