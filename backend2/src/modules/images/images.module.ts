import { Module } from '@nestjs/common';
import { ProductImagesController } from './infraestructure/controllers/product-images.controller';
import { ProductImageService } from './application/product-image.service';
import { ProductImageRepository } from './infraestructure/repositories/product-image.repository';
import { IProductImageRepository } from './domain/repositories/product-image.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './domain/entities/product-image.entity';
import { Product } from '../products/domain/entities/product.entity';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([ProductImage, Product]),
    ProductsModule,
  ],
  controllers: [ProductImagesController],
  providers: [
    {
      provide: IProductImageRepository,
      useClass: ProductImageRepository,
    },
    ProductImageService,
  ],
})
export class ImagesModule {}
