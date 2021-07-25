import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Seminar } from '../seminar/seminar.entity';

@Entity()
export class SeminarProgress {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  seminar_date: Date;

  @Column()
  seminar_number_of_time: number;

  @Column()
  attendance: boolean;

  @Column()
  assignment: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * DATABASE RELATIONSHIP
   * */
  @ManyToOne(() => Account, (account) => account.seminar_progress)
  user_uuid: string;

  @ManyToOne(() => Seminar, (seminar) => seminar.seminar_progress)
  seminar_uuid: string;
}
