import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeminarRegistration } from '../seminar-registration/seminar-registration.entity';
import { SeminarProgress } from '../seminar-progress/seminar-progress.entity';
import { Account } from '../account/account.entity';

@Entity()
export class Seminar {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  year_code: string;

  @Column()
  register_start_date: Date;

  @Column()
  register_end_date: Date;

  @Column()
  instructor_uuid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * DATABASE RELATIONSHIP
   * */
  @OneToOne(() => Account, (account) => account.owned_seminar)
  @JoinColumn({ name: 'instructor_uuid' })
  instructor: Account;

  @OneToMany(
    () => SeminarRegistration,
    (seminar_registration) => seminar_registration.seminar_uuid,
  )
  seminar_registrations: Seminar[];

  @OneToMany(
    () => SeminarProgress,
    (seminar_progress) => seminar_progress.seminar_uuid,
  )
  seminar_progress: Seminar[];
}
