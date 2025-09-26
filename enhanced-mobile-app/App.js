import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { I18nextProvider } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// Import theme and navigation
import theme from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';

// Import i18n
import initI18n from './src/i18n/i18n';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [i18n, setI18n] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize i18n
        const i18nInstance = await initI18n();
        setI18n(i18nInstance);

        // Pre-load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...FontAwesome5.font,
          ...MaterialCommunityIcons.font,
          'Playfair-Display': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
          'Playfair-Display-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
          'Playfair-Display-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
          'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
          'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
          'Cinzel': require('./assets/fonts/Cinzel-Regular.ttf'),
          'Cinzel-Bold': require('./assets/fonts/Cinzel-Bold.ttf'),
        });

        // Pre-load assets
        await Asset.loadAsync([
          require('./assets/splash.png'),
          require('./assets/icon.png'),
          require('./assets/castle-background.jpg'),
        ]);

        // Artificially delay for a smoother splash screen experience
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !i18n) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </I18nextProvider>
  );
}