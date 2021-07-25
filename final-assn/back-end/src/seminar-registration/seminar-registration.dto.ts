import { SeminarStatusType } from './seminar-registration.meta';

export class SeminarRegistrationCreateDto {
  readonly user_uuid: string;
  readonly seminar_uuid: string;
}

export class SeminarRegistrationUpdateDto {
  readonly status: SeminarStatusType;
}
