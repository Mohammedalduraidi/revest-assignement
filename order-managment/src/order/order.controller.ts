import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import OrderModel from 'src/database/models/orders.model';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  IOrderWithProductDataToDto,
  UpdateOrderDto,
} from './dto';
import { ValidationPipe } from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({
    status: 201,
    description: 'The order created successfully',
    type: OrderModel,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() orderModel: CreateOrderDto): Promise<OrderModel> {
    return this.orderService.createOrder(orderModel);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Return all orders.',
    type: [OrderModel],
  })
  @Get()
  async findAll(): Promise<IOrderWithProductDataToDto[]> {
    return this.orderService.getOrders();
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the specified order',
    type: OrderModel,
  })
  @ApiResponse({ status: 404, description: 'order not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderModel> {
    return this.orderService.getOrderById(id);
  }

  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({
    status: 200,
    description: 'The order updated successfully',
    type: UpdateOrderDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderModel> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({
    status: 200,
    description: 'The order deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
