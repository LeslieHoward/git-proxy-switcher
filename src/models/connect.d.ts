import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import type { ObjectType } from '@/utils/types';

export interface Loading {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  settings: ProSettings;
  loading?: ObjectType;
  [key: string]: any;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
