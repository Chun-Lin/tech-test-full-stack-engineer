import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from './redux';
import App from './App';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider>
        <Component />
      </ChakraProvider>
    </Provider>,
    document.getElementById('cape-canaveral')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
