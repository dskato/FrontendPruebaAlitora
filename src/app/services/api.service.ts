import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../interfaces/base-response';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  appUrl: string = 'http://localhost:5114/';

  userRes_add: string = 'client/AddClient';
  userRes_getall: string = 'client/GetAllClients';
  userRes_delete: string = 'client/DeleteClientById';
  userRes_update: string = 'client/UpdateClient';

  prdRes_getAll: string = 'product/GetAllProduct';
  prdRes_add: string = 'product/AddProduct';
  pdrRes_delete:string = 'product/DeleteProductById';
  prdRes_update: string = 'product/UpdateProduct';

  ordRes_add:string = 'order/AddOrder';


  constructor(private http: HttpClient) {}

  addClient(
    clientId: number = 0,
    firstname: string,
    lastname: string
  ): Observable<BaseResponse<string>> {
    const payload = { clientId, firstname, lastname };
    return this.http.post<BaseResponse<string>>(
      this.appUrl + this.userRes_add,
      payload
    );
  }

  addOrder(
    orderId: string,
    orderDate: Date,
    clientId: number,
    productId: number,
    quantity:number
  ): Observable<BaseResponse<string>> {
    const payload = { orderId, orderDate, clientId, productId, quantity };
    return this.http.post<BaseResponse<string>>(
      this.appUrl + this.ordRes_add,
      payload
    );
  }
  
  addProduct(
    productId: number = 0,
    name: string,
    unitPrice: number
  ): Observable<BaseResponse<string>> {
    const payload = { productId, name, unitPrice };
    return this.http.post<BaseResponse<string>>(
      this.appUrl + this.prdRes_add,
      payload
    );
  }

  getAllClients(): Observable<BaseResponse<string>> {
    return this.http.get<BaseResponse<string>>(
      this.appUrl + this.userRes_getall
    );
  }

  getAllProducts(): Observable<BaseResponse<string>> {
    return this.http.get<BaseResponse<string>>(
      this.appUrl + this.prdRes_getAll
    );
  }

  deleteClient(id: number): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(
      this.appUrl + this.userRes_delete +"/"+id
    );
  }

  deleteProduct(id: number): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(
      this.appUrl + this.pdrRes_delete +"/"+id
    );
  }


  updateClient(
    clientId: number = 0,
    firstname: string,
    lastname: string
  ): Observable<BaseResponse<string>> {
    const payload = { clientId, firstname, lastname };
    return this.http.post<BaseResponse<string>>(
      this.appUrl + this.userRes_update,
      payload
    );
  }

  updateProduct(
    productId: number = 0,
    name: string,
    unitPrice: number
  ): Observable<BaseResponse<string>> {
    const payload = { productId, name, unitPrice };
    return this.http.post<BaseResponse<string>>(
      this.appUrl + this.prdRes_update,
      payload
    );
  }

}
