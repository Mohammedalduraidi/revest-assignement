import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import OrderModel from 'src/database/models/orders.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
