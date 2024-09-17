import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'skills' })
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
