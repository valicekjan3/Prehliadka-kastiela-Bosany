// Globálne premenné
let currentLanguage = 'sk';
const supportedLanguages = [
  { code: 'sk', name: 'Slovenčina', flag: 'sk' },
  { code: 'cs', name: 'Čeština', flag: 'cz' },
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'de', name: 'Deutsch', flag: 'de' },
  { code: 'ja', name: '日本語', flag: 'jp' },
  { code: 'zh', name: '中文', flag: 'cn' },
  { code: 'hi', name: 'हिन्दी', flag: 'in' },
  { code: 'tr', name: 'Türkçe', flag: 'tr' },
  { code: 'ru', name: 'Русский', flag: 'ru' },
  { code: 'fr', name: 'Français', flag: 'fr' },
  { code: 'es', name: 'Español', flag: 'es' },
  { code: 'it', name: 'Italiano', flag: 'it' },
  { code: 'nl', name: 'Nederlands', flag: 'nl' },
  { code: 'pt', name: 'Português', flag: 'pt' },
  { code: 'ar', name: 'العربية', flag: 'sa' },
  { code: 'ko', name: '한국어', flag: 'kr' },
  { code: 'hu', name: 'Magyar', flag: 'hu' },
  { code: 'el', name: 'Ελληνικά', flag: 'gr' },
  { code: 'no', name: 'Norsk', flag: 'no' },
  { code: 'fi', name: 'Suomi', flag: 'fi' },
  { code: 'da', name: 'Dansk', flag: 'dk' },
  { code: 'sv', name: 'Svenska', flag: 'se' }
];

let translations = {};
let achievements = [];
let userPoints = 0;

// DOM elementy
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const languageSelector = document.querySelector('.language-selector');
const virtualTour = document.querySelector('.virtual-tour');
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Inicializácia aplikácie
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSelector();
  initNavigation();
  initScrollEffects();
  initGallery();
  initVirtualTour();
  initGamification();
  loadTranslations();
});

// Inicializácia jazykového prepínača
function initLanguageSelector() {
  // Vytvorenie tlačidla pre výber jazyka
  const button = document.createElement('button');
  button.className = 'language-selector-button';
  button.innerHTML = `
    <img src="assets/flags/${supportedLanguages[0].flag}.png" alt="${supportedLanguages[0].name}">
    <span>${supportedLanguages[0].name}</span>
    <i class="fas fa-chevron-down"></i>
  `;
  
  // Vytvorenie dropdown menu pre jazyky
  const dropdown = document.createElement('div');
  dropdown.className = 'language-dropdown';
  
  // Pridanie jazykov do dropdown menu
  supportedLanguages.forEach(lang => {
    const option = document.createElement('div');
    option.className = 'language-option';
    option.dataset.lang = lang.code;
    option.innerHTML = `
      <img src="assets/flags/${lang.flag}.png" alt="${lang.name}">
      <span>${lang.name}</span>
    `;
    option.addEventListener('click', () => {
      changeLanguage(lang.code);
      dropdown.classList.remove('show');
      
      // Aktualizácia tlačidla
      button.innerHTML = `
        <img src="assets/flags/${lang.flag}.png" alt="${lang.name}">
        <span>${lang.name}</span>
        <i class="fas fa-chevron-down"></i>
      `;
    });
    dropdown.appendChild(option);
  });
  
  // Pridanie event listenera pre tlačidlo
  button.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });
  
  // Zatvorenie dropdown menu pri kliknutí mimo
  document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
  
  // Pridanie elementov do DOM
  languageSelector.appendChild(button);
  languageSelector.appendChild(dropdown);
}

// Zmena jazyka
async function changeLanguage(langCode) {
  if (currentLanguage === langCode) return;
  
  currentLanguage = langCode;
  
  // Uloženie preferencie do localStorage
  localStorage.setItem('preferredLanguage', langCode);
  
  // Načítanie prekladu ak ešte nie je načítaný
  if (!translations[langCode]) {
    await loadLanguageFile(langCode);
  }
  
  // Aplikovanie prekladu
  applyTranslations();
  
  // Pridanie bodov za zmenu jazyka (gamifikácia)
  addAchievement('language_explorer', 'Jazykový objaviteľ', 'Zmenili ste jazyk aplikácie!', 5);
}

// Načítanie jazykových súborov
async function loadTranslations() {
  // Zistenie preferovaného jazyka používateľa
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 
                           navigator.language.split('-')[0] || 
                           'sk';
  
  // Kontrola, či je preferovaný jazyk podporovaný
  const isSupported = supportedLanguages.some(lang => lang.code === preferredLanguage);
  
  // Nastavenie jazyka
  currentLanguage = isSupported ? preferredLanguage : 'sk';
  
  // Načítanie jazykového súboru
  await loadLanguageFile(currentLanguage);
  
  // Aplikovanie prekladu
  applyTranslations();
  
  // Aktualizácia tlačidla jazykového prepínača
  const lang = supportedLanguages.find(l => l.code === currentLanguage);
  if (lang) {
    const button = document.querySelector('.language-selector-button');
    if (button) {
      button.innerHTML = `
        <img src="assets/flags/${lang.flag}.png" alt="${lang.name}">
        <span>${lang.name}</span>
        <i class="fas fa-chevron-down"></i>
      `;
    }
  }
}

// Načítanie jazykového súboru
async function loadLanguageFile(langCode) {
  try {
    const response = await fetch(`locales/${langCode}.json`);
    if (!response.ok) throw new Error(`Failed to load language file: ${langCode}`);
    translations[langCode] = await response.json();
  } catch (error) {
    console.error(error);
    // Fallback na slovenčinu ak sa nepodarí načítať jazykový súbor
    if (langCode !== 'sk') {
      if (!translations['sk']) {
        await loadLanguageFile('sk');
      }
      translations[langCode] = translations['sk'];
    } else {
      // Ak sa nepodarí načítať ani slovenčinu, použijeme prázdny objekt
      translations[langCode] = {};
    }
  }
}


// Aplikovanie prekladu
function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  const alts = document.querySelectorAll('[data-i18n-alt]');
  const ariaLabels = document.querySelectorAll('[data-i18n-aria-label]');
  const contents = document.querySelectorAll('[data-i18n-content]');
  
  // Preklad textov
  elements.forEach(el => {
    const key = el.dataset.i18n;
    const translation = getTranslation(key);
    if (translation) {
      el.textContent = translation;
    }
  });
  
  // Preklad placeholderov
  placeholders.forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const translation = getTranslation(key);
    if (translation) {
      el.placeholder = translation;
    }
  });
  
  // Preklad alt textov
  alts.forEach(el => {
    const key = el.dataset.i18nAlt;
    const translation = getTranslation(key);
    if (translation) {
      el.alt = translation;
    }
  });
  
  // Preklad aria-label atribútov
  ariaLabels.forEach(el => {
    const key = el.dataset.i18nAriaLabel;
    const translation = getTranslation(key);
    if (translation) {
      el.setAttribute('aria-label', translation);
    }
  });
  
  // Preklad content atribútov
  contents.forEach(el => {
    const key = el.dataset.i18nContent;
    const translation = getTranslation(key);
    if (translation) {
      el.setAttribute('content', translation);
    }
  });
  
  // Aktualizácia titulku stránky
  const titleTranslation = getTranslation('page.title');
  if (titleTranslation) {
    document.title = titleTranslation;
  }
  
  // Aktualizácia meta description
  const descriptionTranslation = getTranslation('page.description');
  if (descriptionTranslation) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = descriptionTranslation;
    }
  }
}

  });
  
  // Preklad placeholderov
  placeholders.forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const translation = getTranslation(key);
    if (translation) {
      el.placeholder = translation;
    }
  });
  
  // Preklad alt textov
  alts.forEach(el => {
    const key = el.dataset.i18nAlt;
    const translation = getTranslation(key);
    if (translation) {
      el.alt = translation;
    }
  });
  
  // Aktualizácia titulku stránky
  const titleTranslation = getTranslation('page.title');
  if (titleTranslation) {
    document.title = titleTranslation;
  }
  
  // Aktualizácia meta description
  const descriptionTranslation = getTranslation('page.description');
  if (descriptionTranslation) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = descriptionTranslation;
    }
  }
}

// Získanie prekladu podľa kľúča
function getTranslation(key) {
  if (!translations[currentLanguage]) return null;
  
  // Rozdelenie kľúča na časti (napr. "header.title" -> ["header", "title"])
  const parts = key.split('.');
  
  // Postupné prechádzanie objektom prekladu
  let translation = translations[currentLanguage];
  for (const part of parts) {
    if (!translation[part]) return null;
    translation = translation[part];
  }
  
  return translation;
}

// Inicializácia navigácie
function initNavigation() {
  // Menu toggle pre mobilné zariadenia
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Zatvorenie menu po kliknutí na odkaz
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Aktívny odkaz v navigácii
  window.addEventListener('scroll', updateActiveNavLink);
}

// Aktualizácia aktívneho odkazu v navigácii
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Inicializácia efektov pri scrollovaní
function initScrollEffects() {
  // Zmena štýlu headeru pri scrollovaní
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
  
  // Animácie pri scrollovaní
  const animatedElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Inicializácia galérie
function initGallery() {
  // Filtrovanie galérie
  galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Odstránenie aktívnej triedy zo všetkých filtrov
      galleryFilters.forEach(f => f.classList.remove('active'));
      
      // Pridanie aktívnej triedy na kliknutý filter
      filter.classList.add('active');
      
      // Získanie kategórie filtra
      const filterValue = filter.dataset.filter;
      
      // Filtrovanie položiek galérie
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      
      // Pridanie bodov za použitie filtra (gamifikácia)
      addAchievement('gallery_explorer', 'Galéria objaviteľ', 'Použili ste filter v galérii!', 2);
    });
  });
  
  // Lightbox pre galériu
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(item, index);
    });
  });
  
  // Zatvorenie lightboxu
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigácia v lightboxe
  lightboxPrev.addEventListener('click', () => {
    navigateLightbox(-1);
  });
  
  lightboxNext.addEventListener('click', () => {
    navigateLightbox(1);
  });
  
  // Klávesové skratky pre lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      navigateLightbox(1);
    }
  });
  
  // Načítanie lazy-loaded videí
  const lazyVideos = document.querySelectorAll('video[data-src]');
  lazyVideos.forEach(video => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.src = video.dataset.src;
          observer.unobserve(video);
        }
      });
    });
    observer.observe(video);
  });
}

// Otvorenie lightboxu
function openLightbox(item, index) {
  // Vyčistenie obsahu lightboxu
  lightboxContent.innerHTML = '';
  
  // Zistenie, či ide o obrázok alebo video
  const isVideo = item.querySelector('video') !== null;
  
  if (isVideo) {
    // Vytvorenie video elementu
    const video = document.createElement('video');
    video.src = item.querySelector('video').dataset.src;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    
    // Pridanie videa do lightboxu
    lightboxContent.appendChild(video);
  } else {
    // Vytvorenie obrázku
    const img = document.createElement('img');
    img.src = item.querySelector('img').src;
    img.alt = item.querySelector('img').alt;
    
    // Pridanie obrázku do lightboxu
    lightboxContent.appendChild(img);
  }
  
  // Nastavenie popisu
  const caption = item.querySelector('.gallery-caption');
  if (caption) {
    lightboxCaption.textContent = caption.textContent;
  } else {
    lightboxCaption.textContent = '';
  }
  
  // Nastavenie aktuálneho indexu
  lightbox.dataset.currentIndex = index;
  
  // Zobrazenie lightboxu
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Pridanie bodov za zobrazenie položky v lightboxe (gamifikácia)
  addAchievement('detail_viewer', 'Detailný prehliadač', 'Prezreli ste si detail v galérii!', 3);
}

// Zatvorenie lightboxu
function closeLightbox() {
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
  
  // Zastavenie videa ak je prehrávané
  const video = lightboxContent.querySelector('video');
  if (video) {
    video.pause();
  }
}

// Navigácia v lightboxe
function navigateLightbox(direction) {
  // Získanie aktuálneho indexu
  let currentIndex = parseInt(lightbox.dataset.currentIndex);
  
  // Výpočet nového indexu
  let newIndex = currentIndex + direction;
  
  // Kontrola hraníc
  if (newIndex < 0) {
    newIndex = galleryItems.length - 1;
  } else if (newIndex >= galleryItems.length) {
    newIndex = 0;
  }
  
  // Kontrola, či je položka viditeľná (nie je filtrovaná)
  while (galleryItems[newIndex].style.display === 'none') {
    newIndex += direction;
    
    if (newIndex < 0) {
      newIndex = galleryItems.length - 1;
    } else if (newIndex >= galleryItems.length) {
      newIndex = 0;
    }
    
    // Zabránenie nekonečnej slučke
    if (newIndex === currentIndex) {
      break;
    }
  }
  
  // Otvorenie novej položky
  openLightbox(galleryItems[newIndex], newIndex);
}

// Inicializácia virtuálnej prehliadky
function initVirtualTour() {
  // Simulácia načítania virtuálnej prehliadky
  setTimeout(() => {
    // Odstránenie loading indikátora
    const tourLoading = document.querySelector('.tour-loading');
    if (tourLoading) {
      tourLoading.style.display = 'none';
    }
    
    // Vytvorenie virtuálnej prehliadky
    createVirtualTour();
  }, 1500);
}

// Vytvorenie virtuálnej prehliadky
function createVirtualTour() {
  // Vytvorenie kontajnera pre virtuálnu prehliadku
  const tourContainer = document.createElement('div');
  tourContainer.className = 'tour-container';
  
  // Vytvorenie mapy kaštieľa
  const tourMap = document.createElement('div');
  tourMap.className = 'tour-map';
  
  // Vytvorenie bodov záujmu na mape
  const pointsOfInterest = [
    { id: 'entrance', name: 'Vstup', x: 50, y: 80 },
    { id: 'hall', name: 'Hlavná sála', x: 50, y: 50 },
    { id: 'library', name: 'Knižnica', x: 30, y: 40 },
    { id: 'bedroom', name: 'Spálňa', x: 70, y: 40 },
    { id: 'garden', name: 'Záhrada', x: 50, y: 20 }
  ];
  
  // Pridanie bodov záujmu na mapu
  pointsOfInterest.forEach(poi => {
    const point = document.createElement('div');
    point.className = 'tour-point';
    point.dataset.id = poi.id;
    point.style.left = `${poi.x}%`;
    point.style.top = `${poi.y}%`;
    point.innerHTML = `<span class="tour-point-name">${poi.name}</span>`;
    
    // Pridanie event listenera
    point.addEventListener('click', () => {
      showTourLocation(poi.id);
    });
    
    tourMap.appendChild(point);
  });
  
  // Vytvorenie zobrazenia prehliadky
  const tourView = document.createElement('div');
  tourView.className = 'tour-view';
  tourView.innerHTML = `
    <div class="tour-view-content">
      <h3 data-i18n="tour.welcome.title">Vitajte v kaštieli Bošany</h3>
      <p data-i18n="tour.welcome.text">Vyberte si bod záujmu na mape pre začatie virtuálnej prehliadky.</p>
      <img src="img/Snimka_1.PNG" alt="Kaštieľ Bošany" class="tour-welcome-image">
    </div>
  `;
  
  // Pridanie mapy a zobrazenia do kontajnera
  tourContainer.appendChild(tourMap);
  tourContainer.appendChild(tourView);
  
  // Pridanie kontajnera do virtuálnej prehliadky
  virtualTour.appendChild(tourContainer);
  
  // Aplikovanie prekladu
  applyTranslations();
  
  // Pridanie štýlov pre virtuálnu prehliadku
  addTourStyles();
}

// Zobrazenie lokácie vo virtuálnej prehliadke
function showTourLocation(locationId) {
  // Získanie zobrazenia prehliadky
  const tourView = document.querySelector('.tour-view');
  
  // Získanie všetkých bodov záujmu
  const points = document.querySelectorAll('.tour-point');
  
  // Odstránenie aktívnej triedy zo všetkých bodov
  points.forEach(point => point.classList.remove('active'));
  
  // Pridanie aktívnej triedy na vybraný bod
  const activePoint = document.querySelector(`.tour-point[data-id="${locationId}"]`);
  if (activePoint) {
    activePoint.classList.add('active');
  }
  
  // Obsah pre rôzne lokácie
  const locations = {
    entrance: {
      title: 'tour.locations.entrance.title',
      text: 'tour.locations.entrance.text',
      image: 'img/Snimka_2.PNG',
      video: 'video/Snimka 1.mp4'
    },
    hall: {
      title: 'tour.locations.hall.title',
      text: 'tour.locations.hall.text',
      image: 'img/Snimka_3.PNG',
      video: 'video/Snimka 2.mp4'
    },
    library: {
      title: 'tour.locations.library.title',
      text: 'tour.locations.library.text',
      image: 'img/Snimka_4.PNG',
      video: 'video/Snimok 3.mp4'
    },
    bedroom: {
      title: 'tour.locations.bedroom.title',
      text: 'tour.locations.bedroom.text',
      image: 'img/Snimka_5.PNG',
      video: 'video/Snimka 4.mp4'
    },
    garden: {
      title: 'tour.locations.garden.title',
      text: 'tour.locations.garden.text',
      image: 'img/Snimka_6.PNG',
      video: 'video/Snimka 5.mp4'
    }
  };
  
  // Získanie obsahu pre vybranú lokáciu
  const location = locations[locationId];
  
  // Ak lokácia neexistuje, zobrazíme uvítaciu obrazovku
  if (!location) {
    tourView.innerHTML = `
      <div class="tour-view-content">
        <h3 data-i18n="tour.welcome.title">Vitajte v kaštieli Bošany</h3>
        <p data-i18n="tour.welcome.text">Vyberte si bod záujmu na mape pre začatie virtuálnej prehliadky.</p>
        <img src="img/Snimka_1.PNG" alt="Kaštieľ Bošany" class="tour-welcome-image">
      </div>
    `;
    applyTranslations();
    return;
  }
  
  // Vytvorenie obsahu pre vybranú lokáciu
  tourView.innerHTML = `
    <div class="tour-view-content">
      <h3 data-i18n="${location.title}">${getTranslation(location.title) || 'Názov lokácie'}</h3>
      <p data-i18n="${location.text}">${getTranslation(location.text) || 'Popis lokácie'}</p>
      <div class="tour-media">
        <img src="${location.image}" alt="${getTranslation(location.title) || 'Obrázok lokácie'}" class="tour-image">
        ${location.video ? `
          <div class="tour-video-container">
            <video src="${location.video}" controls class="tour-video"></video>
          </div>
        ` : ''}
      </div>
      <div class="tour-navigation">
        <button class="tour-prev" data-i18n="tour.navigation.prev">Predchádzajúca</button>
        <button class="tour-next" data-i18n="tour.navigation.next">Nasledujúca</button>
      </div>
    </div>
  `;
  
  // Pridanie event listenerov pre navigačné tlačidlá
  const prevButton = tourView.querySelector('.tour-prev');
  const nextButton = tourView.querySelector('.tour-next');
  
  if (prevButton && nextButton) {
    // Získanie indexu aktuálnej lokácie
    const locationIds = Object.keys(locations);
    const currentIndex = locationIds.indexOf(locationId);
    
    // Nastavenie predchádzajúcej lokácie
    prevButton.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + locationIds.length) % locationIds.length;
      showTourLocation(locationIds[prevIndex]);
    });
    
    // Nastavenie nasledujúcej lokácie
    nextButton.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % locationIds.length;
      showTourLocation(locationIds[nextIndex]);
    });
  }
  
  // Aplikovanie prekladu
  applyTranslations();
  
  // Pridanie bodov za prehliadku lokácie (gamifikácia)
  addAchievement('tour_explorer', 'Prehliadkový objaviteľ', `Prezreli ste si ${getTranslation(location.title) || 'lokáciu'}!`, 5);
}

// Pridanie štýlov pre virtuálnu prehliadku
function addTourStyles() {
  // Vytvorenie štýlov
  const style = document.createElement('style');
  style.textContent = `
    .tour-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #fff;
      border-radius: var(--border-radius);
      overflow: hidden;
    }
    
    .tour-map {
      position: relative;
      height: 200px;
      background-image: url('img/Snimka_1.PNG');
      background-size: cover;
      background-position: center;
      border-bottom: 2px solid var(--secondary-color);
    }
    
    .tour-point {
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: var(--primary-color);
      border: 3px solid var(--secondary-color);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: var(--transition);
      z-index: 1;
    }
    
    .tour-point:hover, .tour-point.active {
      background-color: var(--secondary-color);
      transform: translate(-50%, -50%) scale(1.2);
    }
    
    .tour-point-name {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--primary-color);
      color: var(--light-text-color);
      padding: 5px 10px;
      border-radius: var(--border-radius);
      font-size: 0.8rem;
      white-space: nowrap;
      opacity: 0;
      transition: var(--transition);
      pointer-events: none;
    }
    
    .tour-point:hover .tour-point-name {
      opacity: 1;
      transform: translateX(-50%) translateY(-5px);
    }
    
    .tour-view {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
    
    .tour-view-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .tour-view-content h3 {
      font-family: var(--header-font);
      color: var(--primary-color);
      margin-bottom: 15px;
    }
    
    .tour-view-content p {
      margin-bottom: 20px;
    }
    
    .tour-welcome-image {
      width: 100%;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
    }
    
    .tour-media {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .tour-image {
      flex: 1;
      min-width: 300px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
    }
    
    .tour-video-container {
      flex: 1;
      min-width: 300px;
    }
    
    .tour-video {
      width: 100%;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
    }
    
    .tour-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    
    .tour-prev, .tour-next {
      padding: 10px 20px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
    }
    
    .tour-prev:hover, .tour-next:hover {
      background-color: var(--secondary-color);
    }
    
    @media (min-width: 768px) {
      .tour-container {
        flex-direction: row;
      }
      
      .tour-map {
        width: 300px;
        height: auto;
        border-bottom: none;
        border-right: 2px solid var(--secondary-color);
      }
    }
  `;
  
  // Pridanie štýlov do hlavičky
  document.head.appendChild(style);
}

// Inicializácia gamifikácie
function initGamification() {
  // Načítanie uložených úspechov a bodov
  loadAchievements();
  
  // Pridanie event listenerov pre sledovanie aktivít
  document.addEventListener('scroll', () => {
    // Kontrola, či používateľ prešiel celú stránku
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      addAchievement('full_explorer', 'Kompletný prieskumník', 'Prešli ste celú stránku!', 10);
    }
  });
  
  // Sledovanie času stráveného na stránke
  let timeSpent = 0;
  setInterval(() => {
    timeSpent += 1;
    
    // Pridanie úspechu po 5 minútach
    if (timeSpent === 300) {
      addAchievement('time_spent', 'Časový nadšenec', 'Strávili ste 5 minút na stránke!', 15);
    }
  }, 1000);
  
  // Vytvorenie panelu s bodmi
  createPointsPanel();
}

// Vytvorenie panelu s bodmi
function createPointsPanel() {
  const pointsPanel = document.createElement('div');
  pointsPanel.className = 'points-panel';
  pointsPanel.innerHTML = `
    <div class="points-value">${userPoints}</div>
    <div class="points-label" data-i18n="gamification.points">Bodov</div>
  `;
  
  // Pridanie panelu do DOM
  document.body.appendChild(pointsPanel);
  
  // Pridanie štýlov pre panel
  const style = document.createElement('style');
  style.textContent = `
    .points-panel {
      position: fixed;
      top: 100px;
      right: 20px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      padding: 10px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      text-align: center;
      z-index: 999;
    }
    
    .points-value {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .points-label {
      font-size: 0.8rem;
    }
  `;
  
  // Pridanie štýlov do hlavičky
  document.head.appendChild(style);
}

// Pridanie úspechu
function addAchievement(id, title, description, points) {
  // Kontrola, či už úspech existuje
  if (achievements.some(a => a.id === id)) {
    return;
  }
  
  // Vytvorenie úspechu
  const achievement = {
    id,
    title,
    description,
    points,
    date: new Date().toISOString()
  };
  
  // Pridanie úspechu do zoznamu
  achievements.push(achievement);
  
  // Pridanie bodov
  userPoints += points;
  
  // Aktualizácia panelu s bodmi
  const pointsValue = document.querySelector('.points-value');
  if (pointsValue) {
    pointsValue.textContent = userPoints;
  }
  
  // Zobrazenie notifikácie
  showAchievementNotification(achievement);
  
  // Uloženie úspechov a bodov
  saveAchievements();
}

// Zobrazenie notifikácie o úspechu
function showAchievementNotification(achievement) {
  // Vytvorenie notifikácie
  const notification = document.createElement('div');
  notification.className = 'achievement';
  notification.innerHTML = `
    <div class="achievement-icon">
      <i class="fas fa-trophy"></i>
    </div>
    <div class="achievement-content">
      <h4>${achievement.title}</h4>
      <p>${achievement.description}</p>
      <p>+${achievement.points} bodov</p>
    </div>
  `;
  
  // Pridanie notifikácie do DOM
  document.body.appendChild(notification);
  
  // Zobrazenie notifikácie
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Odstránenie notifikácie po 5 sekundách
  setTimeout(() => {
    notification.classList.remove('show');
    
    // Odstránenie notifikácie z DOM po animácii
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
}

// Uloženie úspechov a bodov
function saveAchievements() {
  localStorage.setItem('achievements', JSON.stringify(achievements));
  localStorage.setItem('userPoints', userPoints.toString());
}

// Načítanie uložených úspechov a bodov
function loadAchievements() {
  // Načítanie úspechov
  const savedAchievements = localStorage.getItem('achievements');
  if (savedAchievements) {
    achievements = JSON.parse(savedAchievements);
  }
  
  // Načítanie bodov
  const savedPoints = localStorage.getItem('userPoints');
  if (savedPoints) {
    userPoints = parseInt(savedPoints);
  }
}

// Service Worker pre PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}