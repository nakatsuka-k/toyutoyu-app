import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import type { WebViewNavigation } from 'react-native-webview';
import SplashScreen from './SplashScreen';

const HOME_URL = 'https://totoyu-58355.bubbleapps.io/';
const ALLOWED_HOSTS = new Set(['totoyu-58355.bubbleapps.io']);
const BG_COLOR = '#F9F4E9';

function isAllowedUrl(urlString: string): boolean {
  if (urlString === 'about:blank') return true;
  try {
    const url = new URL(urlString);
    if (url.protocol !== 'https:') return false;
    return ALLOWED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

// JavaScriptコードでリンククリックのデフォルト動作をオーバーライド
const INJECT_JAVASCRIPT = `
  (function() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a[href]');
      if (target && target.href) {
        const url = new URL(target.href, window.location.href);
        // totoyu-58355.bubbleapps.io ドメイン以外のリンクをクリック禁止
        if (url.hostname !== 'totoyu-58355.bubbleapps.io') {
          e.preventDefault();
          return false;
        }
      }
    }, true);
  })();
  true;
`;


export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [canGoBack]);

  const onNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  const onShouldStartLoadWithRequest = useCallback((request: { url: string }) => {
    if (isAllowedUrl(request.url)) return true;
    Linking.openURL(request.url).catch(() => {
      // ignore
    });
    return false;
  }, []);

  const webViewSource = useMemo(() => ({ uri: HOME_URL }), []);

  if (splashVisible) {
    return <SplashScreen onFinish={() => setSplashVisible(false)} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <WebView
          ref={webViewRef}
          source={webViewSource}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
          onNavigationStateChange={onNavigationStateChange}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          injectedJavaScript={INJECT_JAVASCRIPT}
          javaScriptEnabled
          allowsLinkPreview={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BG_COLOR,
  },
});
