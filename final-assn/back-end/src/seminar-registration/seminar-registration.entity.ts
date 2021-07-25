import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { SeminarStatusType } from './seminar-registration.meta';
import { Account } from '../account/account.entity';
import { Seminar } from '../seminar/seminar.entity';

@Entity()
export class SeminarRegistration {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  status: SeminarStatusType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * DATABASE RELATIONSHIP
   * */
  @ManyToOne(() => Account, (account) => account.seminar_registrations)
  @JoinColumn()
  user_uuid: string;

  @ManyToOne(() => Seminar, (seminar) => seminar.seminar_progress)
  @JoinColumn()
  seminar_uuid: string;
}
