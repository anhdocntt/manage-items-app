import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, finalize, throwError } from "rxjs";
import ToastController from "../controllers/toast.controller";
import { HTTP_ERROR_CODE } from "../shared/enums";
import { TOAST_MSG } from "../shared/messages";

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  private wCredentials: boolean = false;

  constructor(
    private readonly toastController: ToastController,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req)
    if (req.url.includes('assets')) {
      req = req.clone({
        url: `${req.url}`,
        withCredentials: this.wCredentials
      });
    } else {
      if (!req.url.includes('http')) {
        const apiUrl = 'http://localhost:3000';
        const url: string = `${apiUrl}${req.url}`;
        req = req.clone({
          url,
          withCredentials: this.wCredentials
        });
      }
    }
    return next.handle(req).pipe(
      finalize((): void => { }),
      catchError((error: HttpErrorResponse): Observable<never> => {
        if (error.status === HTTP_ERROR_CODE.BAD_REQUEST) {
          if (typeof error.error.errors == "string") {
            this.toastController.error(error.error.errors);
          } else {
            if (error.error instanceof ArrayBuffer) {
              this.handleArrayBufferErrors(error);
            } else {
              this.toastController.error(error.error.errors[0]);
            }
          }
        } else {
          let errMsg: string = '';
          if (error.error) {
            error.error.hasOwnProperty('errors') && (errMsg = error.error.errors[0]);
            error.error.hasOwnProperty('message') && (errMsg = error.error.message);
            errMsg = TOAST_MSG.GENERAL.SOMETHING_WRONG;
          } else {
            errMsg = TOAST_MSG.GENERAL.SOMETHING_WRONG;
          }
          this.toastController.error(errMsg);
        }
        return throwError(() => error);
      })
    );
  }

  private handleArrayBufferErrors(error: HttpErrorResponse): void {
    let clonedError = { ...error };
    const decodedString = String.fromCharCode.apply(null, new Uint8Array(error.error) as unknown as number[]);
    clonedError.error = JSON.parse(decodedString);
    this.toastController.error(clonedError.error.errors[0]);
  }
}