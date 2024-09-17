import { SkillEntity } from 'src/skills/models/entity/skill.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEnum } from '../enum/';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  category: CategoryEnum;

  @Column({ length: 2 })
  language: string;

  @Column({ default: false })
  deleted?: boolean;

  @OneToMany(() => SkillEntity, (skill) => skill.user, { cascade: true })
  skills: SkillEntity[];
}
