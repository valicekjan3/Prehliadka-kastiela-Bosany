# Kaštieľ Bošany - Mobilná aplikácia

Mobilná aplikácia pre kaštieľ Bošany s podporou 22 jazykov, interaktívnymi prehliadkami, historickými informáciami, galériou fotografií a videí, a gamifikačnými prvkami.

## Funkcie

- **Viacjazyčná podpora**: 22 jazykov vrátane slovenčiny, češtiny, angličtiny, nemčiny a ďalších
- **Interaktívne prehliadky**: Virtuálna prehliadka kaštieľa s 2D a 3D animáciami
- **QR skener**: Skenovanie QR kódov v kaštieli pre získanie dodatočných informácií
- **Rozšírená realita (AR)**: Zobrazenie 3D modelov kaštieľa v reálnom prostredí
- **Offline režim**: Prístup k základným informáciám aj bez pripojenia k internetu
- **Push notifikácie**: Informácie o aktuálnych udalostiach v kaštieli
- **Gamifikácia**: Herné prvky ako odmeny, úspechy a kvízy

## Požiadavky

- Node.js 14 alebo novší
- Expo CLI
- Xcode (pre iOS)
- Android Studio (pre Android)

## Inštalácia

1. Nainštalujte závislosti:
   ```bash
   npm install
   ```

2. Spustite vývojový server:
   ```bash
   npm start
   ```

3. Spustite aplikáciu na emulátore alebo fyzickom zariadení:
   ```bash
   # Pre iOS
   npm run ios
   
   # Pre Android
   npm run android
   ```

## Zostavenie aplikácie

### Zostavenie pre Android

```bash
npm run build:android
```

### Zostavenie pre iOS

```bash
npm run build:ios
```

## Publikovanie aplikácie

### Publikovanie na Google Play

```bash
npm run submit:android
```

### Publikovanie na App Store

```bash
npm run submit:ios
```

## Štruktúra projektu

```
mobile-app/
├── App.js                # Hlavný súbor aplikácie
├── app.json              # Konfigurácia Expo
├── assets/               # Obrázky, ikony a ďalšie assets
├── babel.config.js       # Konfigurácia Babel
├── eas.json              # Konfigurácia EAS Build
├── metro.config.js       # Konfigurácia Metro Bundler
├── package.json          # Závislosti a skripty
└── README.md             # Dokumentácia
```

## Licencia

Tento projekt je licencovaný pod MIT licenciou - pozrite si súbor `LICENSE` pre detaily.