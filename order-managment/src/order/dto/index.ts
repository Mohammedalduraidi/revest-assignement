import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Product UUID',
    example: 'e3acfa98-a50c-409b-ab10-a74e3a3e0dda',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Order Name',
    example: 'Sample order name',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Sample Quantity',
    example: 10,
  })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity cannot be less than 0 or negative' })
  quantity: number;

  @ApiProperty({
    description: 'An optional description of the orderr',
    example: 'Order Desc..',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

export class UpdateOrderDto {
  @IsUUID()
  productId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1, { message: 'Quantity cannot be less than 0 or negative' })
  quantity: number;
}

export interface IProductData {
  id: string;
  name: string;
  price: 0;
  description?: string;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface IOrderWithProductDataToDto {
  orderName: string;
  orderDesc: string;
  orderQuantity: number;
  orderCreatedAt: Date;
  productName: string;
  productStock: number;
  productPrice: number;
}
