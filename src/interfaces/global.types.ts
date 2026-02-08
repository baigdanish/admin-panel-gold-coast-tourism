import type { ChangeEvent } from "react";

export interface IResponse<T> {
  statusCode: number;
  data?: T;
  message: string;
  totalCount: number;
}

export interface IActionResponse {
  statusCode: number;
  data?: any;
  message: string;
  totalCount: number;
  success?: boolean;
}

export interface IOptions {
  value?: string;
  id?: string;
}
export interface IOptionWithLabel {
  value: string;
  label: string;
}

export type IChangeEvent = ChangeEvent<HTMLInputElement>;
export type IFormik = any;

export interface IDatetimeFormat {
  utcDate: string | number;
  hasDateOnly?: boolean;
  hasDatetime?: boolean;
}
export interface IDropdown {
  id: number | string;
  value: string;
}
export type IFilterValues<T> = {
  type: T;
  value: string | number;
};
export interface IFilter<T> {
  url: string;
  values: IFilterValues<T>[];
}
