import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  publicPath: './',
  history: { type: 'hash' },
  title: false,
  routes: routes,
  antd: {},
  dva: {
    hmr: true,
  },
  dynamicImport: {},
  ignoreMomentLocale: true,
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
    Cfg: require('path').resolve(__dirname, '../config'),
  },
  favicon: 'logo.ico',
  // extraBabelPlugins: [['import', { libraryName: 'ahooks', camel2DashComponentName: false }]],
  chainWebpack(config: any) {
    config.merge({
      target: 'electron-renderer',
    });
  },
});
