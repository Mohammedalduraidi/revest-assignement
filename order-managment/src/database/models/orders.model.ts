/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IOrderAttribs, IOrderInitAttribs } from '../interfaces/index';

@Table({
  tableName: 'ord_order',
  freezeTableName: true,
  timestamps: true,
  underscored: true,
})
export default class Order extends Model<IOrderAttribs, IOrderInitAttribs> {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column
  productId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  quantity: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
