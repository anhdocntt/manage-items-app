import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, finalize, throwError } from "rxjs";
import ToastController from "../controllers/toast.controller";
import { TOAST_MSG } from "../shared/messages";

export function urlIntercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const toastController = inject(ToastController)
  let wCredentials: boolean = false;
  const apiUrl = 'http://localhost:3000';
  const url: string = `${apiUrl}${req.url}`;
  req = req.clone({
    url,
    withCredentials: wCredentials
  });
  return next(req).pipe(
    finalize((): void => { }),
    catchError((error: HttpErrorResponse): Observable<never> => {
      toastController.error(error.error ?? TOAST_MSG.GENERAL.SOMETHING_WRONG);
      return throwError(() => error);
    })
  );
}