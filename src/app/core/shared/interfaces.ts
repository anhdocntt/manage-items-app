import { HttpHeaders, HttpParams } from "@angular/common/http";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export interface IToastConfigOption {
    title?: string;
    duration?: number;
    panelClass?: string;
    horizontalPosition?: MatSnackBarHorizontalPosition | undefined;
    verticalPosition?: MatSnackBarVerticalPosition | undefined;
}

export interface IParams {
    params?: HttpParams;
    headers?: HttpHeaders;
}

export interface ISourceAndTargetKey {
    [key: string]: any;
}