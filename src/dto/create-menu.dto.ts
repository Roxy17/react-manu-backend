import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}
