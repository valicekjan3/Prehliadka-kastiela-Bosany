# Kaštieľ Bošany Mobile Application

A world-class mobile application for Bošany Castle with multilingual support, interactive features, 2D/3D animations, and gamification elements.

## Features

- **Multilingual Support**: Full support for 22 languages including Slovak, Czech, English, German, Japanese, Chinese, Hindi, Turkish, Russian, French, Spanish, Italian, Dutch, Portuguese, Arabic, Korean, Hungarian, Greek, Norwegian, Finnish, Danish, and Swedish.

- **Interactive Virtual Tour**: Explore the castle with interactive 2D and 3D visualizations, hotspots, and detailed information about each location.

- **Rich Historical Content**: Learn about the castle's history through an interactive timeline, historical figures, and artifacts.

- **Media Gallery**: Browse through a collection of high-quality photos and videos showcasing the castle's architecture and history.

- **Events Calendar**: Stay updated on upcoming events, exhibitions, and activities at the castle.

- **Gamification Elements**: Earn points and achievements as you explore the castle and learn about its history.

- **AR Experience**: Use augmented reality to enhance your visit with historical overlays and interactive elements.

- **Accessibility Features**: Designed to be accessible to all users, including those with disabilities.

## Technology Stack

- **React Native**: Cross-platform mobile development framework
- **Expo**: Development toolkit for React Native
- **i18next**: Internationalization framework
- **React Navigation**: Navigation library for React Native
- **React Native Paper**: Material Design components
- **Three.js**: 3D rendering library
- **Expo GL**: OpenGL bindings for Expo
- **React Native Reanimated**: Animation library

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/valicekjan3/Prehliadka-kastiela-Bosany.git
cd Prehliadka-kastiela-Bosany/enhanced-mobile-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open the app on your device using the Expo Go app or run it in a simulator/emulator.

## Project Structure

```
enhanced-mobile-app/
├── assets/               # Static assets (images, fonts, etc.)
│   ├── flags/            # Flag icons for language selection
│   ├── fonts/            # Custom fonts
│   ├── tour/             # Tour images and 3D models
│   └── ...
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization setup
│   │   └── translations/ # Language JSON files
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # App screens
│   ├── services/         # API and other services
│   ├── theme/            # Theme configuration
│   └── utils/            # Utility functions
├── App.js                # Main app component
├── app.json              # Expo configuration
└── package.json          # Project dependencies
```

## Multilingual Support

The application supports 22 languages with a user-friendly language selector. Language files are stored in the `src/i18n/translations` directory as JSON files.

To add or modify translations:

1. Edit the corresponding language file in `src/i18n/translations/`
2. For new languages, create a new JSON file following the same structure as the existing ones
3. Add the language to the `supportedLanguages` array in `src/i18n/i18n.js`

## Building for Production

### Android

```bash
expo build:android
```

### iOS

```bash
expo build:ios
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Ján Valíček - Project owner
- Bošany Castle - For providing historical information and media content