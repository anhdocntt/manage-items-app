import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";
import SpinnerController from "../controllers/spinner.controller";
import { inject } from "@angular/core";

export function spinnerIntercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const spinnerController = inject(SpinnerController)
  let hasSpinner: boolean = false;
  if (req.params.has("spinner")) {
    hasSpinner = true;
    spinnerController.addSpinner(req.urlWithParams ? req.urlWithParams : "");
    req.params.delete('spinner');
  }
  return next(req).pipe(
    finalize((): void => {
      if (hasSpinner) {
        setTimeout(() => spinnerController.removeSpinner(req.url), 500);
      }
      setTimeout(() => spinnerController.removeSpinner(req.url), 500);
    }),
    catchError((error: any): any => throwError(() => error))
  ) as Observable<HttpEvent<any>>;
}