import { User } from 'src/modules/auth/domain/entities/user.entity';
import { ProductImage } from 'src/modules/images/domain/entities/product-image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    type: 'bit',
    default: true,
  })
  recordStatus?: boolean;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
