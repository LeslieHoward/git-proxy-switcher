import type { OptionsType } from 'rc-select/lib/interface';

export type SelectOptionsType = OptionsType;

export type PathShape = string | number | (string | number)[] | (string | number)[][];

export type ObjectType = Record<string, any>;

export type RecordItemShape = ObjectType;

export type RequestConfigShape = {
  method?: string;
  params?: any;
  url: string;
  timeout?: number;
  headers?: Record<string, any>;
  independent?: boolean;
  transformRequest?: any;
  env?: 'common' | 'spcare' | boolean;
  shipUserInfo?: boolean;
  [key: string]: any;
};
