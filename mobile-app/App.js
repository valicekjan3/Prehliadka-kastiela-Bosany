import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  Platform, 
  ActivityIndicator,
  BackHandler,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Localization from 'expo-localization';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

// Konfigurácia notifikácií
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showARView, setShowARView] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://kastiel-bosany.sk');
  const [language, setLanguage] = useState('sk');
  const webViewRef = useRef(null);

  // Kontrola pripojenia k internetu
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  // Získanie povolení
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const locationPermission = await Location.requestForegroundPermissionsAsync();
      const notificationPermission = await Notifications.requestPermissionsAsync();
      
      setHasPermissions(
        cameraPermission.status === 'granted' && 
        locationPermission.status === 'granted' &&
        notificationPermission.status === 'granted'
      );
    })();
  }, []);

  // Nastavenie jazyka
  useEffect(() => {
    const getStoredLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          setLanguage(storedLanguage);
        } else {
          // Použitie jazyka zariadenia
          const deviceLanguage = Localization.locale.split('-')[0];
          // Kontrola, či je jazyk zariadenia podporovaný
          const supportedLanguages = ['sk', 'cs', 'en', 'de', 'ja', 'zh', 'hi', 'tr', 'ru', 'fr', 'es', 'it', 'nl', 'pt', 'ar', 'ko', 'hu', 'el', 'no', 'fi', 'da', 'sv'];
          if (supportedLanguages.includes(deviceLanguage)) {
            setLanguage(deviceLanguage);
            await AsyncStorage.setItem('language', deviceLanguage);
          }
        }
      } catch (error) {
        console.error('Error getting stored language:', error);
      }
    };

    getStoredLanguage();
  }, []);

  // Spracovanie tlačidla späť na Androide
  useEffect(() => {
    const backAction = () => {
      if (showQRScanner) {
        setShowQRScanner(false);
        return true;
      }
      if (showARView) {
        setShowARView(false);
        return true;
      }
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [showQRScanner, showARView]);

  // Spracovanie správ z WebView
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      switch (data.type) {
        case 'SCAN_QR':
          setShowQRScanner(true);
          break;
        case 'SHOW_AR':
          setShowARView(true);
          break;
        case 'SET_LANGUAGE':
          setLanguage(data.language);
          AsyncStorage.setItem('language', data.language);
          break;
        case 'ACHIEVEMENT_UNLOCKED':
          showAchievementNotification(data.title, data.message);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  // Zobrazenie notifikácie o úspechu
  const showAchievementNotification = async (title, message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null,
    });
  };

  // Spracovanie naskenovaného QR kódu
  const handleBarCodeScanned = ({ type, data }) => {
    setShowQRScanner(false);
    
    // Kontrola, či je QR kód platný pre našu aplikáciu
    if (data.startsWith('kastiel-bosany://')) {
      const path = data.replace('kastiel-bosany://', '');
      const newUrl = `https://kastiel-bosany.sk/${path}`;
      setCurrentUrl(newUrl);
      
      // Informovanie WebView o naskenovanom QR kóde
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          window.dispatchEvent(new CustomEvent('qrCodeScanned', { detail: { path: '${path}' } }));
          true;
        `);
      }
    } else {
      Alert.alert(
        'Neplatný QR kód',
        'Tento QR kód nie je platný pre kaštieľ Bošany.'
      );
    }
  };

  // Injektovanie JavaScript kódu do WebView
  const injectedJavaScript = `
    // Komunikácia s natívnou aplikáciou
    window.ReactNativeWebView = {
      postMessage: function(data) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    };
    
    // Pridanie event listenera pre skenovanie QR kódu
    document.addEventListener('scanQR', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SCAN_QR' }));
    });
    
    // Pridanie event listenera pre zobrazenie AR
    document.addEventListener('showAR', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SHOW_AR' }));
    });
    
    // Pridanie event listenera pre zmenu jazyka
    document.addEventListener('languageChanged', function(e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ 
        type: 'SET_LANGUAGE', 
        language: e.detail.lang 
      }));
    });
    
    // Pridanie event listenera pre odomknutie úspechu
    document.addEventListener('achievementUnlocked', function(e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ 
        type: 'ACHIEVEMENT_UNLOCKED', 
        title: e.detail.title,
        message: e.detail.message
      }));
    });
    
    // Informovanie WebView, že je v natívnej aplikácii
    window.isNativeApp = true;
    
    // Nastavenie jazyka
    window.currentLanguage = '${language}';
    
    // Vytvorenie event listenera pre načítanie stránky
    document.addEventListener('DOMContentLoaded', function() {
      // Informovanie WebView, že je v natívnej aplikácii
      if (typeof changeLanguage === 'function') {
        changeLanguage('${language}');
      }
    });
    
    true;
  `;

  // Zobrazenie QR skenera
  if (showQRScanner) {
    return (
      <SafeAreaView style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarCodeScanned}
        >
          <View style={styles.qrOverlay}>
            <Text style={styles.qrText}>Naskenujte QR kód kaštieľa Bošany</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowQRScanner(false)}
            >
              <Ionicons name="close-circle" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </SafeAreaView>
    );
  }

  // Zobrazenie AR pohľadu (placeholder)
  if (showARView) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.arContainer}>
          <Text style={styles.arText}>Rozšírená realita</Text>
          <Text style={styles.arSubText}>Táto funkcia bude dostupná v budúcej verzii aplikácie.</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowARView(false)}
          >
            <Ionicons name="close-circle" size={40} color="#8b4513" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Zobrazenie offline stránky
  if (!isConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.offlineContainer}>
          <Ionicons name="cloud-offline" size={80} color="#8b4513" />
          <Text style={styles.offlineTitle}>Ste offline</Text>
          <Text style={styles.offlineText}>
            Vyzerá to tak, že nemáte pripojenie k internetu. Pre prehliadanie virtuálnej prehliadky kaštieľa Bošany potrebujete internetové pripojenie.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => NetInfo.fetch().then(state => setIsConnected(state.isConnected))}
          >
            <Text style={styles.retryButtonText}>Skúsiť znova</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#8b4513"
      />
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8b4513" />
            <Text style={styles.loadingText}>Načítavam kaštieľ Bošany...</Text>
          </View>
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onMessage={handleMessage}
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#8b4513" />
              <Text style={styles.loadingText}>Načítavam kaštieľ Bošany...</Text>
            </View>
          )}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error: ', nativeEvent);
          }}
        />
        <View style={styles.toolbar}>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => webViewRef.current.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => webViewRef.current.reload()}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => setShowQRScanner(true)}
          >
            <Ionicons name="qr-code" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => setShowARView(true)}
          >
            <Ionicons name="cube" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => webViewRef.current.goForward()}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8b4513',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#8b4513',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toolbarButton: {
    padding: 10,
  },
  camera: {
    flex: 1,
  },
  qrOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  arContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  arText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b4513',
    marginBottom: 20,
  },
  arSubText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  offlineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b4513',
    marginTop: 20,
    marginBottom: 10,
  },
  offlineText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: '#8b4513',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});