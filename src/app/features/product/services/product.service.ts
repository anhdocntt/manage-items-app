import { Injectable } from "@angular/core";
import ToastController from "../../../core/controllers/toast.controller";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { getParamOptions } from "../../../core/utils/http.util";
import { Product, CreateUpdateProductBody } from "./product.dto";

@Injectable({ providedIn: 'root' })
export class ProductService {
    api: string = '/products';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly toast: ToastController,
    ) { }

    getAllProduct(disableSpinner: boolean = false): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.api}`, getParamOptions(disableSpinner))
    }

    getProductDetail(productId: string, disableSpinner: boolean = false): Observable<Product> {
        return this.httpClient.get<Product>(`${this.api}/${productId}`, getParamOptions(disableSpinner))
    }

    createProduct(payload: CreateUpdateProductBody, disableSpinner: boolean = false) {
        return this.httpClient.post(`${this.api}`, payload, getParamOptions(disableSpinner))
    }

    updateProduct(productId: string, payload: CreateUpdateProductBody, disableSpinner: boolean = false) {
        return this.httpClient.put(`${this.api}/${productId}`, payload, getParamOptions(disableSpinner))
    }

    softDeleteProduct(productId: string, disableSpinner: boolean = false) {
        return this.httpClient.patch(`${this.api}/${productId}`, { isDeleted: true }, getParamOptions(disableSpinner))
    }

    deleteProduct(productId: string, disableSpinner: boolean = false) {
        return this.httpClient.delete(`${this.api}/${productId}`, getParamOptions(disableSpinner))
    }
}