import { Optional } from 'sequelize';

export interface IProductAttribs {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IProductInitAttribs
  extends Optional<
    IProductAttribs,
    'description' | 'created_at' | 'updated_at'
  > {}
