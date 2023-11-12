import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}
