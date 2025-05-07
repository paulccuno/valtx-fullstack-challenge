import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CreateProductImageDto } from '../../dto/create-product-image.dto';
import { ProductImageService } from '../../application/product-image.service';

@Controller('products/:id/images')
export class ProductImagesController {
  constructor(private readonly service: ProductImageService) {}

  @Post()
  create(
    @Param('id', new ParseUUIDPipe()) productId: string,
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    return this.service.create(productId, createProductImageDto);
  }

  @Get()
  findAll(@Param('id', new ParseUUIDPipe()) productId: string) {
    return this.service.findAll(productId);
  }
}
