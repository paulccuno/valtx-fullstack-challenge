import { ProductImage } from '../entities/product-image.entity';

export abstract class IProductImageRepository {
  abstract create(image: Partial<ProductImage>): Promise<ProductImage>;

  abstract findByProductId(productId: string): Promise<ProductImage[]>;
}
