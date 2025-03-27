import { FormControl } from "@angular/forms";
import { Params } from "@angular/router";

export type HeaderOptionsType = { [key: string]: string };
export type ParamWithSpinnerFn = (disableSpinner: boolean, headerOptions?: HeaderOptionsType) => Params;
export type RequestQueryFn = (queries?: object) => string;
export type NullableForm<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
}