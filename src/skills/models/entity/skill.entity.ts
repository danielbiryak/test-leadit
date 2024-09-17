import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../users/models/entity/user.entity';

@Entity({ name: 'skills' })
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  level: string;

  @ManyToOne(() => UserEntity, (user) => user.skills, { onDelete: 'CASCADE' })
  user: UserEntity;
}
