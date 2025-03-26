import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize, Observable, throwError } from "rxjs";
import SpinnerController from "../controllers/spinner.controller";
import ToastController from "../controllers/toast.controller";
import { HTTP_ERROR_CODE } from "../shared/enums";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private readonly spinnerController: SpinnerController,
    private readonly toastController: ToastController,
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let hasSpinner: boolean = false;
    if (req.params.has("spinner")) {
      hasSpinner = true;
      this.spinnerController.addSpinner(req.urlWithParams ? req.urlWithParams : "");
      req.params.delete('spinner');
    }
    return next.handle(req).pipe(
      finalize((): void => {
        if (hasSpinner) {
          setTimeout(() => this.spinnerController.removeSpinner(req.url), 500);
        }
        setTimeout(() => this.spinnerController.removeSpinner(req.url), 500);
      }),
      catchError((error: any): any => {
        if (error.status === HTTP_ERROR_CODE.UNAUTHORIZED && Boolean(this.router.getCurrentNavigation()?.previousNavigation)) {
          // account service need to logout here
        }
        return throwError(() => error);
      })
    ) as Observable<HttpEvent<any>>;
  }
}