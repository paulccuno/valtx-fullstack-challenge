import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { ImagesModule } from './modules/images/images.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { envConfig } from './config/env.config';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        { ttl: envConfig.THROTTLER_TTL, limit: envConfig.THROTTLER_LIMIT },
      ],
    }),
    DatabaseModule,
    AuthModule,
    ProductsModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [ProductsModule],
})
export class AppModule {}
