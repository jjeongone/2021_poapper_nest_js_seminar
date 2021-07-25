import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountType } from './account.meta';
import { SeminarRegistration } from '../seminar-registration/seminar-registration.entity';
import { Seminar } from '../seminar/seminar.entity';
import { SeminarProgress } from '../seminar-progress/seminar-progress.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  email: string;

  @Column({ nullable: false })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  crypto_salt: string;

  @Column({ nullable: false })
  account_type: AccountType;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  last_login_at: Date;

  /**
   * Database Relationship
   * */
  @OneToOne(() => Seminar, (seminar) => seminar.instructor)
  owned_seminar: Seminar;

  @OneToMany(
    () => SeminarRegistration,
    (seminar_registration) => seminar_registration.user_uuid,
  )
  @JoinColumn()
  seminar_registrations: Seminar[];

  @OneToMany(
    () => SeminarProgress,
    (seminar_progress) => seminar_progress.seminar_uuid,
  )
  seminar_progress: Seminar[];
}
