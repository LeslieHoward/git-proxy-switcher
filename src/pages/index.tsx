import React from 'react';
import { Button } from 'antd';
import { ipcRenderer } from 'electron';
import styles from './index.css';

export default function Index() {
  React.useEffect(() => {
    console.log('重载了');
    ipcRenderer.on('MESSAGE_REPLY', (event, arg) => {
      console.log('主线程答复', arg);
    });
  }, []);

  const sendMessage = () => {
    ipcRenderer.send('MESSAGE', '我发过去了');
  };

  return (
    <div className={styles.normal}>
      <Button type="primary" onClick={sendMessage}>
        点击发送
      </Button>
    </div>
  );
}
