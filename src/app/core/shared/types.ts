import { Params } from "@angular/router";

export type HeaderOptionsType = { [key: string]: string };
export type ParamWithSpinnerFn = (disableSpinner: boolean, headerOptions?: HeaderOptionsType) => Params;
export type RequestQueryFn = (queries?: object) => string;