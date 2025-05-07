import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from '../dto/create-product-image.dto';
import { ProductImage } from '../domain/entities/product-image.entity';
import { IProductImageRepository } from '../domain/repositories/product-image.repository';
import { ProductService } from 'src/modules/products/application/product.service';

@Injectable()
export class ProductImageService {
  constructor(
    private readonly productService: ProductService,
    private readonly productImageRepository: IProductImageRepository,
  ) {}

  async create(
    productId: string,
    createProductImageDto: CreateProductImageDto,
  ) {
    const product = await this.productService.findOne(productId);

    const newProductImage = new ProductImage({
      productId: product.id,
      url: createProductImageDto.url,
    });

    const record = await this.productImageRepository.create(newProductImage);

    return record;
  }

  async findAll(productId: string) {
    const product = await this.productService.findOne(productId);

    const images = await this.productImageRepository.findByProductId(
      product.id,
    );

    return images;
  }
}
