import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { IProductRepository } from '../domain/repositories/product.repository';
import { Product } from '../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct: Product = new Product({
      name: createProductDto.name,
      category: createProductDto.category,
      user: { id: createProductDto.userId } as any,
    });

    const record = await this.productRepository.createProduct(newProduct);

    return record;
  }

  async findAll() {
    return await this.productRepository.getProducts();
  }

  async findOne(id: string) {
    const product = await this.productRepository.getProductById(id);

    if (!product)
      throw new HttpException(
        `Product not found with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    Object.keys(updateProductDto).forEach((key) => {
      !updateProductDto[key] && delete updateProductDto[key];
    });

    const updatedProduct: Product = new Product({
      ...product,
      ...updateProductDto,
    });

    const record = await this.productRepository.updateProduct(
      id,
      updatedProduct,
    );

    return record;
  }

  async remove(id: string) {
    await this.findOne(id);

    const record = await this.productRepository.removeProduct(id);

    return record;
  }
}
