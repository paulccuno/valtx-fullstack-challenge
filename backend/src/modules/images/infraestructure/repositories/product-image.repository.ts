import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductImageRepository } from '../../domain/repositories/product-image.repository';
import { ProductImage } from '../../domain/entities/product-image.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductImageRepository extends IProductImageRepository {
  constructor(
    @InjectRepository(ProductImage)
    private readonly repo: Repository<ProductImage>,
  ) {
    super();
  }

  create(image: ProductImage): Promise<ProductImage> {
    return this.repo.save(image);
  }

  findByProductId(productId: string): Promise<ProductImage[]> {
    return this.repo.find({ where: { productId } });
  }
}
