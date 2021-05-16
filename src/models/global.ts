import type { Effect, Reducer } from 'umi';
import _ from 'lodash';
import type { ObjectType } from '@/utils/types';

export type UserInfo = ObjectType;
export interface UserPermission {
  permission?: Record<number, string>;
}

export type StateShape = Record<string, any>;
export type EffectShape = Record<string, Effect>;
export type ReducerShape = Record<string, Reducer>;

export type ModelShape = {
  namespace: string;
  state: StateShape;
  effects: EffectShape;
  reducers: ReducerShape;
};

const GlobalModel: ModelShape = {
  namespace: 'global',

  state: {},

  effects: {},

  reducers: {},
};

export default GlobalModel;
