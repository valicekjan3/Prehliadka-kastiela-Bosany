# Kaštieľ Bošany - API Dokumentácia

Táto dokumentácia popisuje API, ktoré sa používa na komunikáciu medzi webovou a mobilnou aplikáciou kaštieľa Bošany.

## Komunikačné rozhranie

Komunikácia medzi webovou a mobilnou aplikáciou prebieha prostredníctvom JavaScript udalostí (events) a správ (messages).

### Webová aplikácia → Mobilná aplikácia

Webová aplikácia komunikuje s mobilnou aplikáciou pomocou vlastných udalostí, ktoré sú zachytené v mobilnej aplikácii.

#### Skenovanie QR kódu

```javascript
// Vyvolanie skenovania QR kódu
document.dispatchEvent(new CustomEvent('scanQR'));
```

#### Zobrazenie rozšírenej reality (AR)

```javascript
// Vyvolanie zobrazenia AR
document.dispatchEvent(new CustomEvent('showAR'));
```

#### Zmena jazyka

```javascript
// Informovanie mobilnej aplikácie o zmene jazyka
document.dispatchEvent(new CustomEvent('languageChanged', { 
  detail: { lang: 'sk' } 
}));
```

#### Odomknutie úspechu

```javascript
// Informovanie mobilnej aplikácie o odomknutí úspechu
document.dispatchEvent(new CustomEvent('achievementUnlocked', { 
  detail: { 
    title: 'Nový úspech!', 
    message: 'Dokončili ste virtuálnu prehliadku kaštieľa.' 
  } 
}));
```

### Mobilná aplikácia → Webová aplikácia

Mobilná aplikácia komunikuje s webovou aplikáciou pomocou injektovania JavaScript kódu.

#### Informovanie o naskenovanom QR kóde

```javascript
// Informovanie webovej aplikácie o naskenovanom QR kóde
window.dispatchEvent(new CustomEvent('qrCodeScanned', { 
  detail: { path: 'tour/entrance' } 
}));
```

#### Nastavenie jazyka

```javascript
// Nastavenie jazyka v webovej aplikácii
if (typeof changeLanguage === 'function') {
  changeLanguage('sk');
}
```

#### Informovanie o natívnej aplikácii

```javascript
// Informovanie webovej aplikácie, že je v natívnej aplikácii
window.isNativeApp = true;
```

## URL schéma

Aplikácia používa vlastnú URL schému `kastiel-bosany://` pre hlboké odkazy (deep links) a QR kódy.

### Formát URL

```
kastiel-bosany://<path>
```

### Podporované cesty (paths)

- `tour/entrance` - Presmerovanie na vstup do kaštieľa
- `tour/hall` - Presmerovanie na hlavnú sálu
- `tour/library` - Presmerovanie na knižnicu
- `tour/bedroom` - Presmerovanie na spálňu
- `tour/garden` - Presmerovanie na záhradu
- `events` - Presmerovanie na stránku udalostí
- `quiz` - Presmerovanie na kvíz
- `ar` - Spustenie rozšírenej reality

### Príklad použitia

```
kastiel-bosany://tour/entrance
```

## Notifikácie

Aplikácia používa notifikácie na informovanie používateľa o rôznych udalostiach.

### Typy notifikácií

1. **Uvítacia notifikácia** - Zobrazí sa pri prvom spustení aplikácie
2. **Pripomienka prehliadky** - Zobrazí sa, ak používateľ nenavštívil všetky miestnosti kaštieľa
3. **Notifikácia o udalosti** - Zobrazí sa, keď je v kaštieli nová udalosť
4. **Notifikácia o úspechu** - Zobrazí sa, keď používateľ odomkne nový úspech

### Formát notifikácie

```javascript
{
  title: "Názov notifikácie",
  body: "Text notifikácie",
  data: {
    type: "typ_notifikácie",
    action: "akcia_po_kliknutí",
    url: "url_po_kliknutí"
  }
}
```

## Offline režim

Aplikácia podporuje offline režim, ktorý umožňuje používateľom prezerať základné informácie o kaštieli aj bez pripojenia k internetu.

### Ukladané súbory

- HTML, CSS a JavaScript súbory
- Obrázky a videá
- Jazykové súbory
- 3D modely

### Synchronizácia dát

Keď je aplikácia online, automaticky synchronizuje dáta s serverom. Používateľské údaje, ako sú úspechy a body, sú ukladané lokálne a synchronizované so serverom, keď je to možné.

## Analytika

Aplikácia zbiera anonymné údaje o používaní na zlepšenie používateľského zážitku.

### Sledované udalosti

- Zobrazenie obrazovky
- Dokončenie prehliadky
- Dokončenie kvízu
- Zmena jazyka
- Odomknutie úspechu
- Zobrazenie AR modelu

## Rozšírená realita (AR)

Aplikácia podporuje zobrazenie 3D modelov kaštieľa v rozšírenej realite.

### Podporované modely

- Exteriér kaštieľa
- Interiér kaštieľa

### Formát modelov

Modely sú uložené vo formáte GLB (GL Binary).

## Lokalizácia

Aplikácia podporuje 22 jazykov. Jazykové súbory sú uložené vo formáte JSON.

### Príklad jazykového súboru

```json
{
  "page": {
    "title": "Kaštieľ Bošany - Virtuálna prehliadka",
    "description": "Virtuálna prehliadka kaštieľa Bošany s bohatou históriou a multimediálnym obsahom"
  },
  "header": {
    "title": "Kaštieľ Bošany"
  }
}
```

## Gamifikácia

Aplikácia obsahuje gamifikačné prvky na zvýšenie atraktivity pre používateľov.

### Úspechy

Používatelia môžu odomknúť rôzne úspechy za dokončenie určitých aktivít.

### Body

Používatelia získavajú body za rôzne aktivity, ako je návšteva miestností, dokončenie kvízu, alebo skenovanie QR kódov.

### Odznaky

Používatelia môžu získať odznaky za dosiahnutie určitých míľnikov.

### Výzvy

Aplikácia obsahuje rôzne výzvy, ktoré môžu používatelia plniť.

## Bezpečnosť

Komunikácia medzi webovou a mobilnou aplikáciou je zabezpečená pomocou HTTPS. Používateľské údaje sú ukladané lokálne a synchronizované so serverom pomocou zabezpečeného pripojenia.