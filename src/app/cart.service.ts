import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';
import { ILineItem } from './catalog/line-item.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: BehaviorSubject<ILineItem[]> = new BehaviorSubject<ILineItem[]>(
    []
  );

  constructor(private http: HttpClient) {
    this.http.get<ILineItem[]>('/api/cart').subscribe({
      next: (data) => this.cart.next(data),
    });
  }

  add(product: IProduct) {
    const newCart: ILineItem[] = [
      ...this.cart.getValue(),
      { product: product, qty: 1 },
    ];

    this.cart.next(newCart);

    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('product added', product.name);
    });
  }

  getCartItems(): Observable<ILineItem[]> {
    return this.cart.asObservable();
  }

  remove(product: ILineItem) {
    const filtered = this.cart
      .getValue()
      .filter((item) => item.product.id !== product.product.id);
    console.log('Before');
    this.cart.next(filtered);
    console.log('after');

    this.http.post('/api/cart', filtered).subscribe(() => {
      console.log('after post');
    });
  }

  getTotalPrice() {
    return (
      Math.round(
        this.cart
          .getValue()
          .reduce(
            (prev, current) =>
              prev +
              current.qty *
                (current.product.price * (1 - current.product.discount)),
            0
          )
      ) / 100
    );
  }
}
