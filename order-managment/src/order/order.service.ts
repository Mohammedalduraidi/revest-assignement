import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import OrderModel from 'src/database/models/orders.model';
import {
  CreateOrderDto,
  IOrderWithProductDataToDto,
  IProductData,
  UpdateOrderDto,
} from './dto';
import { HttpService } from 'src/http/http.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel)
    private readonly orderModel: typeof OrderModel,
    private readonly httpService: HttpService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderModel> {
    const { name, quantity, description, productId } = createOrderDto;
    const product = await this.getProductById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const order = await this.orderModel.create({
      name,
      quantity,
      description,
      productId,
    });

    return order;
  }

  async getOrders(): Promise<IOrderWithProductDataToDto[]> {
    const orders = await this.orderModel.findAll();
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        try {
          const product = await this.getProductById(
            order.getDataValue('productId'),
          );

          const orderMapper = {
            orderName: order.getDataValue('name'),
            orderDesc: order.getDataValue('description'),
            orderQuantity: order.getDataValue('quantity'),
            orderCreatedAt: order.getDataValue('created_at'),
            productName: product.name,
            productStock: product.stock,
            productPrice: product.price,
          };
          return orderMapper;
        } catch (error) {
          console.error(
            `Failed to fetch product data for product ID ${order.productId}:`,
            error,
          );
          throw new HttpException('Error fetching product data', 500);
        }
      }),
    );

    return ordersWithProducts;
  }

  async getOrderById(id: string): Promise<OrderModel> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderModel> {
    const { name, quantity, description, productId } = updateOrderDto;

    const order = await this.getOrderById(id);
    return order.update({ name, quantity, description, productId });
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.getOrderById(id);
    await order.destroy(); // hard deleted!
  }

  private async getProductById(productId: string): Promise<IProductData> {
    try {
      const product = await this.httpService.get<IProductData>(
        `/products/${productId}`,
      );
      return product;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      console.error('Error contacting product service', error.message);
      throw new HttpException('Unable to connect to product service', 500);
    }
  }
}
