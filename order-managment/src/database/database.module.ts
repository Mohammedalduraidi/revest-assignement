import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { getSequelizeConfig } from '../config/database.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        ...getSequelizeConfig(),
        models: [join(__dirname, 'models/**/*.model.{ts,js}')],
      }),
    }),
  ],
})
export class DatabaseModule {}
