import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ProductDto } from 'src/app/interfaces/product-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userForm!: FormGroup;
  productForm!: FormGroup;

  selectedClient: UserDto | null = null;
  selectedProduct: ProductDto | null = null;


  users: UserDto[] = [];
  products: ProductDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
    });


  
  }

  ngOnInit(): void {
    const interval$ = interval(10000);
    this.getAllClients();
    this.getAllProducts();

    interval$.subscribe(() => {
      this.getAllClients();
      this.getAllProducts();
    });

  }

  deleteClient(id: number) {
    this.apiService.deleteClient(id).subscribe(
      (response) => {
        console.log(response);
        this.getAllClients();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe(
      (response) => {
        console.log(response);
        this.getAllProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllClients() {
    this.apiService
      .getAllClients()
      .pipe(map((response) => response.data as unknown as UserDto[]))
      .subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.log(error);
        }
      );
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

  addClient() {
    if (this.userForm.valid) {
      var fname = this.userForm.get('firstname')?.value;
      var lname = this.userForm.get('lastname')?.value;

      this.apiService.addClient(0, fname, lname).subscribe(
        (response) => {
          this.getAllClients();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      var name = this.productForm.get('name')?.value;
      var unitPrice = this.productForm.get('unitPrice')?.value;

      this.apiService.addProduct(0, name, unitPrice).subscribe(
        (response) => {
          this.getAllProducts();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  editClient(client: UserDto) {
    this.selectedClient = client;
  }
  editProduct(product: ProductDto) {
    this.selectedProduct = product;
  }
  
  updateClient(client: UserDto) {
    this.apiService.updateClient(client.clientId, client.firstname, client.lastname).subscribe(
      (response) => {
        this.getAllClients();
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProduct(product: ProductDto) {
    this.apiService.updateProduct(product.productId, product.name, parseInt(product.unitPrice)).subscribe(
      (response) => {
        this.getAllProducts();
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
