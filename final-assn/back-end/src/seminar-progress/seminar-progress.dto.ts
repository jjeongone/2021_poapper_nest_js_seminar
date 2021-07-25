export class SeminarProgressDto {
  readonly seminar_date: Date;
  readonly seminar_number_of_time: number;
  readonly attendance: boolean;
  readonly assignment: boolean;
  readonly user_id: string;
  readonly seminar_uuid: string;
}
