import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
import { tick } from '@angular/core/testing';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  products: IProduct[] = [];
  categories: string[];
  filter = '';

  constructor(
    private cartSvc: CartService,
    private ProductSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories = ['Heads', 'Arms', 'Torsos', 'Bases', 'All'];
  }

  ngOnInit() {
    this.ProductSvc.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      complete: () => {
        console.log('Fetch Succesful');
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] || 'All';
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredByCategory() {
    if (this.filter === '' || this.filter === 'All') return this.products;

    return this.products.filter(
      (product: any) => product.category === this.filter
    );
  }
}
