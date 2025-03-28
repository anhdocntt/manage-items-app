import { Injectable } from "@angular/core";
import ToastController from "../../../core/controllers/toast.controller";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { getParamOptions } from "../../../core/utils/http.util";
import { Product, CreateUpdateProductBody } from "./product.dto";
import { TOAST_MSG } from "../../../core/shared/messages";

@Injectable({ providedIn: 'root' })
export class ProductService {
    api: string = '/products';
    query: string = 'isDeleted=false';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly toast: ToastController,
    ) { }

    getAllProduct(disableSpinner: boolean = false): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.api}?${this.query}`, getParamOptions(disableSpinner))
    }

    getProductDetail(productId: string, disableSpinner: boolean = false): Observable<Product> {
        return this.httpClient.get<Product>(`${this.api}/${productId}?${this.query}`, getParamOptions(disableSpinner))
    }

    createProduct(payload: CreateUpdateProductBody, disableSpinner: boolean = false) {
        return this.httpClient.post(`${this.api}?${this.query}`, payload, getParamOptions(disableSpinner))
            .pipe(tap(() => this.toast.success(TOAST_MSG.PRODUCT.CREATE_SUCCESS)));
    }

    updateProduct(productId: string, payload: CreateUpdateProductBody, disableSpinner: boolean = false) {
        return this.httpClient.put(`${this.api}/${productId}?${this.query}`, payload, getParamOptions(disableSpinner))
            .pipe(tap(() => this.toast.success(TOAST_MSG.PRODUCT.UPDATE_SUCCESS)));
    }

    softDeleteProduct(productId: string, disableSpinner: boolean = false) {
        return this.httpClient.patch(`${this.api}/${productId}?${this.query}`, { isDeleted: true }, getParamOptions(disableSpinner))
            .pipe(tap(() => this.toast.success(TOAST_MSG.PRODUCT.DELETE_SUCCESS)));
    }

    deleteProduct(productId: string, disableSpinner: boolean = false) {
        return this.httpClient.delete(`${this.api}/${productId}?${this.query}`, getParamOptions(disableSpinner))
            .pipe(tap(() => this.toast.success(TOAST_MSG.PRODUCT.DELETE_SUCCESS)));
    }
}