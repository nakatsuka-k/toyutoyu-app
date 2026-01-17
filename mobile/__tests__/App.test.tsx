/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import SplashScreen from '../SplashScreen';

test('renders correctly', async () => {
  // Test splash screen rendering only (simplifies async handling)
  let splashRendered = false;
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(
      <SplashScreen onFinish={() => { splashRendered = true; }} />
    );
  });
});
