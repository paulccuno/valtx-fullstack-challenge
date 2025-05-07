import { Module } from '@nestjs/common';
import { ProductService } from './application/product.service';
import { ProductsController } from './infraestructure/controllers/products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { IProductRepository } from './domain/repositories/product.repository';
import { ProductRepository } from './infraestructure/repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';
import { User } from '../auth/domain/entities/user.entity';
import { ProductImage } from '../images/domain/entities/product-image.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Product, User, ProductImage]),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    ProductService,
  ],
  exports: [ProductService],
})
export class ProductsModule {}
