import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Params } from "@angular/router";
import { IParams, ISourceAndTargetKey } from "../shared/interfaces";
import { HeaderOptionsType, ParamWithSpinnerFn, RequestQueryFn } from "../shared/types";

export const getParamOptions: ParamWithSpinnerFn = (disableSpinner: boolean = false, headerOptions?: HeaderOptionsType): Params => {
  let paramOptions: IParams = {};
  !disableSpinner && (paramOptions.params = new HttpParams().set("spinner", "1"));
  headerOptions && (paramOptions.headers = new HttpHeaders(headerOptions));
  return paramOptions;
}

export const requestQuery: RequestQueryFn = (queries?: object, splitArray = true): string => {
  if (!queries) { return ''; }
  let result: object = JSON.parse(JSON.stringify(queries));
  result = Object.keys(result).map((key: string): string => {
    const isArray = Array.isArray((result as ISourceAndTargetKey)[key]);
    let arrayParams = new HttpParams();
    if (isArray) {
      arrayParams = arrayParams.appendAll({ [key]: (result as ISourceAndTargetKey)[key] });
    }
    return checkAvailable((result as ISourceAndTargetKey)[key])
      ? (isArray && splitArray) ? arrayParams.toString() : `${key}=${encodeURIComponent((result as ISourceAndTargetKey)[key])}`
      : '';
  }).filter((x: string): string => x);
  return Object.values(result).join('&').replace(/#/, '%23');
};

const checkAvailable = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '';
};