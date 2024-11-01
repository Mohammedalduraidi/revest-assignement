import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Product from 'src/database/models/product.model';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, stock, description } = createProductDto;

    const product = await this.productModel.create({
      name,
      price,
      stock,
      description,
    });
    return product;
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, price, stock, description } = updateProductDto;

    const product = await this.getProductById(id);
    return product.update({ name, price, stock, description });
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.getProductById(id);
    await product.destroy();
  }
}
