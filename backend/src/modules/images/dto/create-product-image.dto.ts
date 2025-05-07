import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({ type: String })
  @IsUrl()
  url: string;
}
