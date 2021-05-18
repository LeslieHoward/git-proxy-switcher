import React from 'react';
import { Space, Switch } from 'antd';
import { ipcRenderer } from 'electron';
import styles from './index.less';

export default function Index() {
  React.useEffect(() => {
    ipcRenderer.on('MESSAGE_REPLY', (event, arg) => {
      console.log('Message from Main-Process:', arg);
    });
  }, []);

  const onChange = (checked: boolean) => {
    ipcRenderer.send('MESSAGE', checked);
  };

  return (
    <div className={styles.container}>
      <Space>
        <label>是否开启Git代理：</label>
        <Switch onChange={onChange} />
      </Space>
    </div>
  );
}
