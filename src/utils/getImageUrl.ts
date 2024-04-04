import { IProduct } from 'src/app/catalog/product.model';

export function getImageUrl(product: IProduct) {
  return `/assets/images/robot-parts/${product.imageName}`;
}
