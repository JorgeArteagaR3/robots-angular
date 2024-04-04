import { IProduct } from './product.model';

export type ILineItem = {
  product: IProduct;
  qty: number;
};
