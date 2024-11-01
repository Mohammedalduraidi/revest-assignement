// src/products/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Sample Product',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  @IsInt({ message: 'Price must be an integer' })
  @Min(0, { message: 'Price cannot be negative' })
  price: number = 0;

  @ApiProperty({
    description: 'An optional description of the product',
    example: 'A high-quality sample product',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'The available stock for the product',
    example: 50,
  })
  @IsInt({ message: 'Stock must be an integer' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number = 0;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;
}
