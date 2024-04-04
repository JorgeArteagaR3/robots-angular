import { Component } from '@angular/core';
import { ILineItem } from '../catalog/line-item.model';
import { CartService } from '../cart.service';
import { getImageUrl } from 'src/utils/getImageUrl';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: ILineItem[] = [];

  constructor(private cartSvc: CartService) {}

  getImageUrl = getImageUrl;

  ngOnInit() {
    this.cartSvc.getCartItems().subscribe({
      next: (data) => (this.cartItems = data),
    });
  }

  removeCartItem(product: ILineItem) {
    this.cartSvc.remove(product);
  }
}
