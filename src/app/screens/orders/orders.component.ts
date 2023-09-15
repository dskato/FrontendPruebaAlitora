import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from 'src/app/interfaces/product-dto';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  clientId: any;
  orderForm!: FormGroup;
  products: ProductDto[] = [];
  selectedProductId: string = "";
  qytt: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.orderForm = this.formBuilder.group({
      qyt: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.clientId = params['clientId'];
    });
    this.getAllProducts();
  }

  getAllProducts() {
    this.apiService
      .getAllProducts()
      .pipe(map((response) => response.data as unknown as ProductDto[]))
      .subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addOrder() {
    console.log('Client ID:', this.clientId);
    console.log('Selected Product:', this.selectedProductId);
    console.log('Quantity:', this.qytt);
    const currentDate = new Date();

    this.apiService.addOrder("", currentDate, parseInt(this.clientId),parseInt(this.selectedProductId), this.qytt ).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
