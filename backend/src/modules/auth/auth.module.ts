import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { AuthController } from './infraestructure/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from 'src/config/env.config';
import { IUserRepository } from './domain/repositories/user.repository';
import { UserRepository } from './infraestructure/repositories/user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './domain/entities/user.entity';
import { Product } from '../products/domain/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    UserService,
  ],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Product]),
    JwtModule.register({
      global: true,
      secret: envConfig.JWT_SECRET,
      signOptions: { expiresIn: envConfig.JWT_EXPIRES },
    }),
  ],
})
export class AuthModule {}
