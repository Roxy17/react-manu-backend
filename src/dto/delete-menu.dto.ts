import { ApiProperty } from '@nestjs/swagger';

export class DeleteMenuDto {
  @ApiProperty()
  id: number;
}
