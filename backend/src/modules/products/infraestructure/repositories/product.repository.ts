import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/domain/entities/product.entity';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {
    super();
  }

  async getProducts(): Promise<Product[]> {
    return this.repo.find();
  }

  async createProduct(product: Product): Promise<Product> {
    return this.repo.save(product);
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return this.repo.save(product);
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.repo.findOne({
      where: { id },
    });

    return product;
  }

  async removeProduct(id: string): Promise<Product> {
    return this.repo.save({ id, recordStatus: false });
  }
}
