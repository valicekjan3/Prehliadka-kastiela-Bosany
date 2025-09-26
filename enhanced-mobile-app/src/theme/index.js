import { DefaultTheme, configureFonts } from 'react-native-paper';

// Define custom fonts
const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Bold',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Bold',
      fontWeight: '700',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300',
    },
  },
  android: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Bold',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300',
    },
  }
};

// Define custom theme
const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8B2131',         // Rich Burgundy
    accent: '#D4AF37',          // Antique Gold
    background: '#F5EFE0',      // Warm Cream
    surface: '#FFFFFF',
    text: '#1A1A1A',
    disabled: '#9E9E9E',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#D92B2B',    // Vibrant Red
    
    // Custom colors
    secondary: '#7D8491',       // Stone Gray
    tertiary: '#1E4D2B',        // Deep Forest Green
    quaternary: '#6CA6C1',      // Sky Blue
    highlight: '#5D3954',       // Royal Purple
    
    // UI specific colors
    card: '#FFFFFF',
    border: '#E0E0E0',
    error: '#D92B2B',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  },
  // Custom properties
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    headingFontFamily: 'Playfair-Display',
    bodyFontFamily: 'Roboto',
    decorativeFontFamily: 'Cinzel',
    
    h1: {
      fontFamily: 'Playfair-Display-Bold',
      fontSize: 32,
      lineHeight: 40,
    },
    h2: {
      fontFamily: 'Playfair-Display-Bold',
      fontSize: 28,
      lineHeight: 36,
    },
    h3: {
      fontFamily: 'Playfair-Display-Bold',
      fontSize: 24,
      lineHeight: 32,
    },
    h4: {
      fontFamily: 'Playfair-Display',
      fontSize: 20,
      lineHeight: 28,
    },
    h5: {
      fontFamily: 'Playfair-Display',
      fontSize: 18,
      lineHeight: 26,
    },
    h6: {
      fontFamily: 'Playfair-Display',
      fontSize: 16,
      lineHeight: 24,
    },
    subtitle1: {
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
      lineHeight: 24,
    },
    subtitle2: {
      fontFamily: 'Roboto-Bold',
      fontSize: 14,
      lineHeight: 22,
    },
    body1: {
      fontFamily: 'Roboto',
      fontSize: 16,
      lineHeight: 24,
    },
    body2: {
      fontFamily: 'Roboto',
      fontSize: 14,
      lineHeight: 22,
    },
    button: {
      fontFamily: 'Roboto-Bold',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: 'Roboto-Light',
      fontSize: 12,
      lineHeight: 18,
    },
    overline: {
      fontFamily: 'Roboto',
      fontSize: 10,
      lineHeight: 16,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    decorative: {
      fontFamily: 'Cinzel',
      fontSize: 24,
      lineHeight: 32,
    },
  },
  // Animation durations
  animation: {
    scale: 1.0,
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

export default theme;