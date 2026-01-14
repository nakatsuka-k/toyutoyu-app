/* eslint-env jest */

jest.mock('react-native-webview', () => {
  const React = require('react');
  const { View } = require('react-native');

  function WebView(props) {
    return React.createElement(View, props);
  }

  return {
    WebView,
    default: WebView,
  };
});
