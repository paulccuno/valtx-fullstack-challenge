import { Product } from '../entities/product.entity';

export abstract class IProductRepository {
  abstract getProducts(): Promise<Product[]>;

  abstract createProduct(product: Product): Promise<Product>;

  abstract updateProduct(id: string, product: Product): Promise<Product>;

  abstract getProductById(id: string): Promise<Product | null>;

  abstract removeProduct(id: string): Promise<Product>;
}
