import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'int' })
    score: number

    @CreateDateColumn()
    createdAt: Date
}
