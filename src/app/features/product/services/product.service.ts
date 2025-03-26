import { Injectable } from "@angular/core";
import ToastController from "../../../core/controllers/toast.controller";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { getParamOptions } from "../../../core/utils/http.util";

@Injectable({ providedIn: 'root' })
export class ProductService {
    api: string = '/products';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly toast: ToastController,
    ) { }

    getAllProduct(disableSpinner: boolean = false): Observable<any> {
        return this.httpClient.get<Object>(`${this.api}`, getParamOptions(disableSpinner))
    }
}