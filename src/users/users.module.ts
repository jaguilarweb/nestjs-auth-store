import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserEntity } from './entities/user.entity';
import { CustomerController } from './controllers/customers.controllers';
import { CustomersService } from './services/customers.service';
import { CustomerEntity } from './entities/customer.entity';
import { BrandsController } from 'src/products/controllers/brands.controller';
import { BrandsService } from 'src/products/services/brands.service';
import { BrandEntity } from 'src/products/entities/brand.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CustomerEntity,
      BrandEntity,
      OrderEntity,
      OrderItem,
    ]),
    ProductsModule,
  ],
  controllers: [
    UsersController,
    CustomerController,
    BrandsController,
    OrdersController,
    OrderItemController,
  ],
  providers: [
    UsersService,
    CustomersService,
    BrandsService,
    OrdersService,
    OrderItemService,
  ],
})
export class UsersModule {}
