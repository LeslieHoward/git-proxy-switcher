import React from 'react';
import type { BasicLayoutProps as ProLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'dva';
import _ from 'lodash';
import logo from '@/assets/logo.svg';
import avatar from '@/assets/avatar.svg';
import styles from './style.less';

export interface BasicLayoutProps extends ProLayoutProps {
  routes: { path: string; component: any; [key: string]: any }[];
  dispatch: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children } = props;

  const routes = React.useMemo(() => _.get(props.routes, [0, 'routes']), [props.routes]);

  const menuDataRender = (menuList: MenuDataItem[]): any[] => {
    return menuList.map((item) => {
      const localItem = {
        ...item,
        children: item.children ? menuDataRender(item.children) : undefined,
      };
      if (item?.meta?.hidden) {
        return null;
      }
      return localItem as MenuDataItem;
    });
  };

  return (
    <ProLayout
      logo={logo}
      route={{ routes }}
      menuHeaderRender={(logo, title) => <div className={styles['custom-menu-header']}>{logo}</div>}
      menuDataRender={menuDataRender}
      rightContentRender={() => (
        <div className={styles.avatar}>
          <img src={avatar} />
        </div>
      )}
    >
      {children}
    </ProLayout>
  );
};

export default connect((state: any) => state)(BasicLayout);
