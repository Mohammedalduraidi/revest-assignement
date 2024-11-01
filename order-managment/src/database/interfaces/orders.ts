import { Optional } from 'sequelize';

export interface IOrderAttribs {
  id: string;
  productId: string;
  name: string;
  description: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IOrderInitAttribs
  extends Optional<
    IOrderAttribs,
    'description' | 'created_at' | 'updated_at'
  > {}
