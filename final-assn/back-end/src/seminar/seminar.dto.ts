import { ApiProperty } from '@nestjs/swagger';

export class SeminarDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly year_code: string;

  @ApiProperty()
  readonly register_start_date: Date;

  @ApiProperty()
  readonly register_end_date: Date;

  @ApiProperty()
  readonly instructor_uuid: string;
}
