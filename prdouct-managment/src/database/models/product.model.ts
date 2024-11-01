import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IProductAttribs, IProductInitAttribs } from '../interfaces/index';

@Table({
  tableName: 'prd_product',
  freezeTableName: true,
  timestamps: true,
  underscored: true,
})
export default class Product extends Model<
  IProductAttribs,
  IProductInitAttribs
> {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  stock: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
