import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { getSequelizeConfig } from '../config/database.config';
// import { Product } from './models/product.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        ...getSequelizeConfig(),
        models: [join(__dirname, 'models/**/*.model.{ts,js}')],
        // models: [Product],
      }),
    }),
  ],
})
export class DatabaseModule {}
