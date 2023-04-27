import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import store from './src/store/index';

import styles from './index_style';

const AppRedux = () => (
  <Provider store={store}>
    <ThemeProvider theme={styles}>
      <App />
    </ThemeProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
