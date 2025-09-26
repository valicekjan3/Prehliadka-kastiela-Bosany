// Gamifikačné prvky pre aplikáciu kaštieľa Bošany

// Globálne premenné
let userPoints = 0;
let achievements = [];
let badges = [];
let userLevel = 1;
let userProgress = 0;

// Inicializácia gamifikácie
function initGamification() {
  // Načítanie uložených údajov
  loadUserData();
  
  // Vytvorenie gamifikačného panelu
  createGamificationPanel();
  
  // Pridanie event listenerov pre sledovanie aktivít
  addActivityTracking();
  
  // Inicializácia výziev
  initChallenges();
}

// Načítanie údajov používateľa
function loadUserData() {
  // Načítanie bodov
  const savedPoints = localStorage.getItem('userPoints');
  if (savedPoints) {
    userPoints = parseInt(savedPoints);
  }
  
  // Načítanie úspechov
  const savedAchievements = localStorage.getItem('achievements');
  if (savedAchievements) {
    achievements = JSON.parse(savedAchievements);
  }
  
  // Načítanie odznakov
  const savedBadges = localStorage.getItem('badges');
  if (savedBadges) {
    badges = JSON.parse(savedBadges);
  }
  
  // Načítanie úrovne
  const savedLevel = localStorage.getItem('userLevel');
  if (savedLevel) {
    userLevel = parseInt(savedLevel);
  }
  
  // Načítanie postupu
  const savedProgress = localStorage.getItem('userProgress');
  if (savedProgress) {
    userProgress = parseInt(savedProgress);
  }
}

// Uloženie údajov používateľa
function saveUserData() {
  localStorage.setItem('userPoints', userPoints.toString());
  localStorage.setItem('achievements', JSON.stringify(achievements));
  localStorage.setItem('badges', JSON.stringify(badges));
  localStorage.setItem('userLevel', userLevel.toString());
  localStorage.setItem('userProgress', userProgress.toString());
}

// Vytvorenie gamifikačného panelu
function createGamificationPanel() {
  // Vytvorenie panelu
  const panel = document.createElement('div');
  panel.className = 'gamification-panel';
  panel.innerHTML = `
    <div class="gamification-toggle">
      <i class="fas fa-trophy"></i>
    </div>
    <div class="gamification-content">
      <div class="gamification-header">
        <h3 data-i18n="gamification.title">Vaše úspechy</h3>
        <span class="gamification-close">&times;</span>
      </div>
      <div class="gamification-body">
        <div class="gamification-user">
          <div class="gamification-avatar">
            <i class="fas fa-user"></i>
            <span class="gamification-level">${userLevel}</span>
          </div>
          <div class="gamification-user-info">
            <div class="gamification-username">Návštevník</div>
            <div class="gamification-points">${userPoints} <span data-i18n="gamification.points">bodov</span></div>
          </div>
        </div>
        <div class="gamification-progress">
          <div class="gamification-progress-bar" style="width: ${calculateLevelProgress()}%"></div>
          <div class="gamification-progress-text">${userProgress}/${getPointsForNextLevel()} <span data-i18n="gamification.pointsToNextLevel">bodov do ďalšej úrovne</span></div>
        </div>
        <div class="gamification-tabs">
          <button class="gamification-tab active" data-tab="achievements" data-i18n="gamification.achievements">Úspechy</button>
          <button class="gamification-tab" data-tab="badges" data-i18n="gamification.badges">Odznaky</button>
          <button class="gamification-tab" data-tab="challenges" data-i18n="gamification.challenges">Výzvy</button>
        </div>
        <div class="gamification-tab-content" id="achievements-tab">
          <div class="gamification-achievements">
            ${generateAchievementsList()}
          </div>
        </div>
        <div class="gamification-tab-content" id="badges-tab" style="display: none;">
          <div class="gamification-badges">
            ${generateBadgesList()}
          </div>
        </div>
        <div class="gamification-tab-content" id="challenges-tab" style="display: none;">
          <div class="gamification-challenges">
            ${generateChallengesList()}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Pridanie panelu do DOM
  document.body.appendChild(panel);
  
  // Pridanie štýlov
  addGamificationStyles();
  
  // Pridanie event listenerov
  const toggle = panel.querySelector('.gamification-toggle');
  const close = panel.querySelector('.gamification-close');
  const content = panel.querySelector('.gamification-content');
  const tabs = panel.querySelectorAll('.gamification-tab');
  
  toggle.addEventListener('click', () => {
    content.classList.toggle('show');
  });
  
  close.addEventListener('click', () => {
    content.classList.remove('show');
  });
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Odstránenie aktívnej triedy zo všetkých tabov
      tabs.forEach(t => t.classList.remove('active'));
      
      // Pridanie aktívnej triedy na kliknutý tab
      tab.classList.add('active');
      
      // Skrytie všetkých tab obsahov
      const tabContents = panel.querySelectorAll('.gamification-tab-content');
      tabContents.forEach(content => {
        content.style.display = 'none';
      });
      
      // Zobrazenie vybraného tab obsahu
      const tabId = tab.dataset.tab + '-tab';
      const tabContent = panel.querySelector(`#${tabId}`);
      if (tabContent) {
        tabContent.style.display = 'block';
      }
    });
  });
}

// Pridanie štýlov pre gamifikáciu
function addGamificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .gamification-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
    
    .gamification-toggle {
      width: 50px;
      height: 50px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 1.5rem;
      box-shadow: var(--shadow);
      transition: var(--transition);
    }
    
    .gamification-toggle:hover {
      background-color: var(--secondary-color);
      transform: scale(1.1);
    }
    
    .gamification-content {
      position: absolute;
      bottom: 60px;
      right: 0;
      width: 350px;
      background-color: #fff;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      display: none;
      overflow: hidden;
      transition: var(--transition);
      transform: translateY(20px);
      opacity: 0;
    }
    
    .gamification-content.show {
      display: block;
      transform: translateY(0);
      opacity: 1;
    }
    
    .gamification-header {
      padding: 15px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .gamification-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }
    
    .gamification-close {
      cursor: pointer;
      font-size: 1.5rem;
    }
    
    .gamification-body {
      padding: 15px;
      max-height: 500px;
      overflow-y: auto;
    }
    
    .gamification-user {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .gamification-avatar {
      width: 50px;
      height: 50px;
      background-color: var(--secondary-color);
      color: var(--light-text-color);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      position: relative;
      margin-right: 15px;
    }
    
    .gamification-level {
      position: absolute;
      bottom: -5px;
      right: -5px;
      width: 25px;
      height: 25px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .gamification-user-info {
      flex: 1;
    }
    
    .gamification-username {
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .gamification-points {
      font-size: 0.9rem;
      color: var(--primary-color);
    }
    
    .gamification-progress {
      height: 10px;
      background-color: #eee;
      border-radius: 5px;
      margin-bottom: 15px;
      position: relative;
      overflow: hidden;
    }
    
    .gamification-progress-bar {
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 5px;
    }
    
    .gamification-progress-text {
      position: absolute;
      top: 15px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-color);
    }
    
    .gamification-tabs {
      display: flex;
      margin-bottom: 15px;
      margin-top: 30px;
      border-bottom: 1px solid #eee;
    }
    
    .gamification-tab {
      flex: 1;
      padding: 10px;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
      color: var(--text-color);
      transition: var(--transition);
      border-bottom: 2px solid transparent;
    }
    
    .gamification-tab:hover {
      color: var(--primary-color);
    }
    
    .gamification-tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    
    .gamification-achievements,
    .gamification-badges,
    .gamification-challenges {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
    
    .gamification-achievement,
    .gamification-badge,
    .gamification-challenge {
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: var(--border-radius);
      border-left: 3px solid var(--primary-color);
    }
    
    .gamification-achievement.locked,
    .gamification-badge.locked,
    .gamification-challenge.locked {
      opacity: 0.7;
      border-left-color: #ccc;
    }
    
    .gamification-achievement-header,
    .gamification-badge-header,
    .gamification-challenge-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    
    .gamification-achievement-title,
    .gamification-badge-title,
    .gamification-challenge-title {
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .gamification-achievement.locked .gamification-achievement-title,
    .gamification-badge.locked .gamification-badge-title,
    .gamification-challenge.locked .gamification-challenge-title {
      color: #888;
    }
    
    .gamification-achievement-points,
    .gamification-badge-points,
    .gamification-challenge-points {
      font-size: 0.8rem;
      color: var(--primary-color);
      font-weight: bold;
    }
    
    .gamification-achievement-description,
    .gamification-badge-description,
    .gamification-challenge-description {
      font-size: 0.9rem;
      color: var(--text-color);
    }
    
    .gamification-achievement-date,
    .gamification-badge-date,
    .gamification-challenge-progress {
      font-size: 0.8rem;
      color: #888;
      margin-top: 5px;
    }
    
    .gamification-challenge-progress-bar {
      height: 5px;
      background-color: #eee;
      border-radius: 3px;
      margin-top: 5px;
      overflow: hidden;
    }
    
    .gamification-challenge-progress-fill {
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 3px;
    }
    
    .gamification-notification {
      position: fixed;
      bottom: 80px;
      right: 20px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      padding: 15px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      display: flex;
      align-items: center;
      gap: 15px;
      z-index: 1000;
      transform: translateX(120%);
      transition: transform 0.5s ease;
      max-width: 300px;
    }
    
    .gamification-notification.show {
      transform: translateX(0);
    }
    
    .gamification-notification-icon {
      font-size: 2rem;
      color: var(--accent-color);
    }
    
    .gamification-notification-content h4 {
      margin: 0 0 5px;
    }
    
    .gamification-notification-content p {
      margin: 0;
      font-size: 0.9rem;
    }
    
    @media (max-width: 576px) {
      .gamification-content {
        width: 300px;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Generovanie zoznamu úspechov
function generateAchievementsList() {
  // Definícia dostupných úspechov
  const availableAchievements = [
    {
      id: 'welcome',
      title: 'Vitajte v kaštieli',
      description: 'Navštívili ste stránku kaštieľa Bošany.',
      points: 5
    },
    {
      id: 'explorer',
      title: 'Prieskumník',
      description: 'Prezreli ste si všetky sekcie stránky.',
      points: 10
    },
    {
      id: 'historian',
      title: 'Historik',
      description: 'Prečítali ste si celú históriu kaštieľa.',
      points: 15
    },
    {
      id: 'photographer',
      title: 'Fotograf',
      description: 'Prezreli ste si všetky fotografie v galérii.',
      points: 10
    },
    {
      id: 'virtual_tourist',
      title: 'Virtuálny turista',
      description: 'Dokončili ste virtuálnu prehliadku kaštieľa.',
      points: 20
    },
    {
      id: 'quiz_master',
      title: 'Kvízový majster',
      description: 'Získali ste plný počet bodov v kvíze.',
      points: 25
    },
    {
      id: 'polyglot',
      title: 'Polyglot',
      description: 'Vyskúšali ste aspoň 3 rôzne jazyky.',
      points: 15
    },
    {
      id: '3d_explorer',
      title: '3D prieskumník',
      description: 'Prezreli ste si 3D model kaštieľa.',
      points: 20
    }
  ];
  
  // Generovanie HTML pre zoznam úspechov
  let html = '';
  
  availableAchievements.forEach(achievement => {
    const userAchievement = achievements.find(a => a.id === achievement.id);
    const isUnlocked = userAchievement !== undefined;
    
    html += `
      <div class="gamification-achievement ${isUnlocked ? '' : 'locked'}">
        <div class="gamification-achievement-header">
          <div class="gamification-achievement-title">${achievement.title}</div>
          <div class="gamification-achievement-points">+${achievement.points}</div>
        </div>
        <div class="gamification-achievement-description">${achievement.description}</div>
        ${isUnlocked ? `<div class="gamification-achievement-date">Získané: ${formatDate(userAchievement.date)}</div>` : ''}
      </div>
    `;
  });
  
  return html || '<p>Zatiaľ nemáte žiadne úspechy.</p>';
}

// Generovanie zoznamu odznakov
function generateBadgesList() {
  // Definícia dostupných odznakov
  const availableBadges = [
    {
      id: 'bronze_explorer',
      title: 'Bronzový prieskumník',
      description: 'Získajte 50 bodov.',
      points: 50,
      icon: 'medal'
    },
    {
      id: 'silver_explorer',
      title: 'Strieborný prieskumník',
      description: 'Získajte 100 bodov.',
      points: 100,
      icon: 'medal'
    },
    {
      id: 'gold_explorer',
      title: 'Zlatý prieskumník',
      description: 'Získajte 200 bodov.',
      points: 200,
      icon: 'medal'
    },
    {
      id: 'history_buff',
      title: 'Milovník histórie',
      description: 'Dokončite všetky historické výzvy.',
      points: 50,
      icon: 'book'
    },
    {
      id: 'master_tourist',
      title: 'Majster turista',
      description: 'Dokončite všetky prehliadkové výzvy.',
      points: 75,
      icon: 'map-marked-alt'
    },
    {
      id: 'knowledge_seeker',
      title: 'Hľadač vedomostí',
      description: 'Dokončite všetky kvízové výzvy.',
      points: 100,
      icon: 'graduation-cap'
    }
  ];
  
  // Generovanie HTML pre zoznam odznakov
  let html = '';
  
  availableBadges.forEach(badge => {
    const userBadge = badges.find(b => b.id === badge.id);
    const isUnlocked = userBadge !== undefined;
    
    html += `
      <div class="gamification-badge ${isUnlocked ? '' : 'locked'}">
        <div class="gamification-badge-header">
          <div class="gamification-badge-title">${badge.title}</div>
          <div class="gamification-badge-points">+${badge.points}</div>
        </div>
        <div class="gamification-badge-description">${badge.description}</div>
        ${isUnlocked ? `<div class="gamification-badge-date">Získané: ${formatDate(userBadge.date)}</div>` : ''}
      </div>
    `;
  });
  
  return html || '<p>Zatiaľ nemáte žiadne odznaky.</p>';
}

// Generovanie zoznamu výziev
function generateChallengesList() {
  // Definícia dostupných výziev
  const availableChallenges = [
    {
      id: 'visit_all_sections',
      title: 'Navštívte všetky sekcie',
      description: 'Navštívte všetky sekcie stránky.',
      points: 20,
      progress: 0,
      total: 6
    },
    {
      id: 'view_all_photos',
      title: 'Prezrite si všetky fotografie',
      description: 'Prezrite si všetky fotografie v galérii.',
      points: 15,
      progress: 0,
      total: 8
    },
    {
      id: 'complete_quiz',
      title: 'Dokončite kvíz',
      description: 'Dokončite kvíz o kaštieli Bošany.',
      points: 25,
      progress: 0,
      total: 1
    },
    {
      id: 'change_language',
      title: 'Zmeňte jazyk',
      description: 'Vyskúšajte aspoň 3 rôzne jazyky.',
      points: 10,
      progress: 0,
      total: 3
    },
    {
      id: 'view_3d_model',
      title: 'Prezrite si 3D model',
      description: 'Prezrite si 3D model kaštieľa.',
      points: 20,
      progress: 0,
      total: 1
    }
  ];
  
  // Aktualizácia postupu výziev
  updateChallengesProgress(availableChallenges);
  
  // Generovanie HTML pre zoznam výziev
  let html = '';
  
  availableChallenges.forEach(challenge => {
    const isCompleted = challenge.progress >= challenge.total;
    const progressPercentage = Math.min(100, Math.round((challenge.progress / challenge.total) * 100));
    
    html += `
      <div class="gamification-challenge ${isCompleted ? '' : 'locked'}">
        <div class="gamification-challenge-header">
          <div class="gamification-challenge-title">${challenge.title}</div>
          <div class="gamification-challenge-points">+${challenge.points}</div>
        </div>
        <div class="gamification-challenge-description">${challenge.description}</div>
        <div class="gamification-challenge-progress">${challenge.progress}/${challenge.total}</div>
        <div class="gamification-challenge-progress-bar">
          <div class="gamification-challenge-progress-fill" style="width: ${progressPercentage}%"></div>
        </div>
      </div>
    `;
  });
  
  return html || '<p>Zatiaľ nemáte žiadne výzvy.</p>';
}

// Aktualizácia postupu výziev
function updateChallengesProgress(challenges) {
  // Navštívené sekcie
  const visitedSections = localStorage.getItem('visitedSections');
  if (visitedSections) {
    const sections = JSON.parse(visitedSections);
    const visitAllSectionsChallenge = challenges.find(c => c.id === 'visit_all_sections');
    if (visitAllSectionsChallenge) {
      visitAllSectionsChallenge.progress = sections.length;
    }
  }
  
  // Prezreté fotografie
  const viewedPhotos = localStorage.getItem('viewedPhotos');
  if (viewedPhotos) {
    const photos = JSON.parse(viewedPhotos);
    const viewAllPhotosChallenge = challenges.find(c => c.id === 'view_all_photos');
    if (viewAllPhotosChallenge) {
      viewAllPhotosChallenge.progress = photos.length;
    }
  }
  
  // Dokončený kvíz
  const quizCompleted = localStorage.getItem('quizCompleted');
  if (quizCompleted) {
    const completeQuizChallenge = challenges.find(c => c.id === 'complete_quiz');
    if (completeQuizChallenge) {
      completeQuizChallenge.progress = 1;
    }
  }
  
  // Zmenené jazyky
  const changedLanguages = localStorage.getItem('changedLanguages');
  if (changedLanguages) {
    const languages = JSON.parse(changedLanguages);
    const changeLanguageChallenge = challenges.find(c => c.id === 'change_language');
    if (changeLanguageChallenge) {
      changeLanguageChallenge.progress = languages.length;
    }
  }
  
  // Prezretý 3D model
  const viewed3DModel = localStorage.getItem('viewed3DModel');
  if (viewed3DModel) {
    const view3DModelChallenge = challenges.find(c => c.id === 'view_3d_model');
    if (view3DModelChallenge) {
      view3DModelChallenge.progress = 1;
    }
  }
}

// Inicializácia výziev
function initChallenges() {
  // Inicializácia sledovania navštívených sekcií
  const visitedSections = localStorage.getItem('visitedSections');
  if (!visitedSections) {
    localStorage.setItem('visitedSections', JSON.stringify([]));
  }
  
  // Inicializácia sledovania prezretých fotografií
  const viewedPhotos = localStorage.getItem('viewedPhotos');
  if (!viewedPhotos) {
    localStorage.setItem('viewedPhotos', JSON.stringify([]));
  }
  
  // Inicializácia sledovania zmenených jazykov
  const changedLanguages = localStorage.getItem('changedLanguages');
  if (!changedLanguages) {
    localStorage.setItem('changedLanguages', JSON.stringify([]));
  }
}

// Pridanie sledovania aktivít
function addActivityTracking() {
  // Sledovanie navštívených sekcií
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = section.getAttribute('id');
          if (sectionId) {
            addVisitedSection(sectionId);
          }
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(section);
  });
  
  // Sledovanie prezretých fotografií
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      addViewedPhoto(index);
    });
  });
  
  // Sledovanie zmeny jazyka
  document.addEventListener('languageChanged', (e) => {
    if (e.detail && e.detail.lang) {
      addChangedLanguage(e.detail.lang);
    }
  });
  
  // Sledovanie dokončenia kvízu
  document.addEventListener('quizCompleted', () => {
    localStorage.setItem('quizCompleted', 'true');
    updateChallengeProgress('complete_quiz', 1, 1);
  });
  
  // Sledovanie prezretia 3D modelu
  document.addEventListener('viewed3DModel', () => {
    localStorage.setItem('viewed3DModel', 'true');
    updateChallengeProgress('view_3d_model', 1, 1);
  });
}

// Pridanie navštívenej sekcie
function addVisitedSection(sectionId) {
  const visitedSections = JSON.parse(localStorage.getItem('visitedSections') || '[]');
  
  if (!visitedSections.includes(sectionId)) {
    visitedSections.push(sectionId);
    localStorage.setItem('visitedSections', JSON.stringify(visitedSections));
    
    // Aktualizácia výzvy
    updateChallengeProgress('visit_all_sections', visitedSections.length, 6);
    
    // Pridanie bodov za prvú návštevu sekcie
    addPoints(5, `Navštívili ste sekciu ${sectionId}`);
    
    // Kontrola úspechu za navštívenie všetkých sekcií
    if (visitedSections.length >= 6) {
      addAchievement('explorer', 'Prieskumník', 'Prezreli ste si všetky sekcie stránky.', 10);
    }
  }
}

// Pridanie prezretej fotografie
function addViewedPhoto(photoIndex) {
  const viewedPhotos = JSON.parse(localStorage.getItem('viewedPhotos') || '[]');
  
  if (!viewedPhotos.includes(photoIndex)) {
    viewedPhotos.push(photoIndex);
    localStorage.setItem('viewedPhotos', JSON.stringify(viewedPhotos));
    
    // Aktualizácia výzvy
    updateChallengeProgress('view_all_photos', viewedPhotos.length, 8);
    
    // Pridanie bodov za prvé prezretie fotografie
    addPoints(2, 'Prezreli ste si novú fotografiu');
    
    // Kontrola úspechu za prezretie všetkých fotografií
    if (viewedPhotos.length >= 8) {
      addAchievement('photographer', 'Fotograf', 'Prezreli ste si všetky fotografie v galérii.', 10);
    }
  }
}

// Pridanie zmeneného jazyka
function addChangedLanguage(lang) {
  const changedLanguages = JSON.parse(localStorage.getItem('changedLanguages') || '[]');
  
  if (!changedLanguages.includes(lang)) {
    changedLanguages.push(lang);
    localStorage.setItem('changedLanguages', JSON.stringify(changedLanguages));
    
    // Aktualizácia výzvy
    updateChallengeProgress('change_language', changedLanguages.length, 3);
    
    // Pridanie bodov za prvú zmenu jazyka
    addPoints(5, `Zmenili ste jazyk na ${lang}`);
    
    // Kontrola úspechu za vyskúšanie aspoň 3 jazykov
    if (changedLanguages.length >= 3) {
      addAchievement('polyglot', 'Polyglot', 'Vyskúšali ste aspoň 3 rôzne jazyky.', 15);
    }
  }
}

// Aktualizácia postupu výzvy
function updateChallengeProgress(challengeId, progress, total) {
  // Kontrola, či je výzva dokončená
  if (progress >= total) {
    // Získanie bodov za dokončenie výzvy
    const availableChallenges = [
      { id: 'visit_all_sections', points: 20 },
      { id: 'view_all_photos', points: 15 },
      { id: 'complete_quiz', points: 25 },
      { id: 'change_language', points: 10 },
      { id: 'view_3d_model', points: 20 }
    ];
    
    const challenge = availableChallenges.find(c => c.id === challengeId);
    if (challenge) {
      // Kontrola, či už bola výzva dokončená
      const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
      
      if (!completedChallenges.includes(challengeId)) {
        completedChallenges.push(challengeId);
        localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
        
        // Pridanie bodov za dokončenie výzvy
        addPoints(challenge.points, `Dokončili ste výzvu: ${challengeId}`);
        
        // Zobrazenie notifikácie
        showNotification('Výzva dokončená!', `Dokončili ste výzvu a získali ${challenge.points} bodov.`);
        
        // Kontrola odznakov
        checkBadges();
      }
    }
  }
}

// Kontrola odznakov
function checkBadges() {
  // Definícia odznakov
  const badgeDefinitions = [
    {
      id: 'bronze_explorer',
      title: 'Bronzový prieskumník',
      description: 'Získajte 50 bodov.',
      points: 50,
      condition: () => userPoints >= 50
    },
    {
      id: 'silver_explorer',
      title: 'Strieborný prieskumník',
      description: 'Získajte 100 bodov.',
      points: 100,
      condition: () => userPoints >= 100
    },
    {
      id: 'gold_explorer',
      title: 'Zlatý prieskumník',
      description: 'Získajte 200 bodov.',
      points: 200,
      condition: () => userPoints >= 200
    },
    {
      id: 'history_buff',
      title: 'Milovník histórie',
      description: 'Dokončite všetky historické výzvy.',
      points: 50,
      condition: () => {
        const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
        const historyChallenges = ['visit_all_sections', 'complete_quiz'];
        return historyChallenges.every(c => completedChallenges.includes(c));
      }
    },
    {
      id: 'master_tourist',
      title: 'Majster turista',
      description: 'Dokončite všetky prehliadkové výzvy.',
      points: 75,
      condition: () => {
        const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
        const tourChallenges = ['visit_all_sections', 'view_all_photos', 'view_3d_model'];
        return tourChallenges.every(c => completedChallenges.includes(c));
      }
    },
    {
      id: 'knowledge_seeker',
      title: 'Hľadač vedomostí',
      description: 'Dokončite všetky kvízové výzvy.',
      points: 100,
      condition: () => {
        const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
        const knowledgeChallenges = ['complete_quiz', 'change_language'];
        return knowledgeChallenges.every(c => completedChallenges.includes(c));
      }
    }
  ];
  
  // Kontrola každého odznaku
  badgeDefinitions.forEach(badgeDef => {
    // Kontrola, či už odznak existuje
    const badgeExists = badges.some(b => b.id === badgeDef.id);
    
    if (!badgeExists && badgeDef.condition()) {
      // Vytvorenie nového odznaku
      const newBadge = {
        id: badgeDef.id,
        title: badgeDef.title,
        description: badgeDef.description,
        points: badgeDef.points,
        date: new Date().toISOString()
      };
      
      // Pridanie odznaku
      badges.push(newBadge);
      
      // Pridanie bodov za získanie odznaku
      addPoints(badgeDef.points, `Získali ste odznak: ${badgeDef.title}`);
      
      // Zobrazenie notifikácie
      showNotification('Nový odznak!', `Získali ste odznak ${badgeDef.title} a ${badgeDef.points} bodov.`);
      
      // Uloženie odznakov
      saveUserData();
    }
  });
}

// Pridanie úspechu
function addAchievement(id, title, description, points) {
  // Kontrola, či už úspech existuje
  const achievementExists = achievements.some(a => a.id === id);
  
  if (!achievementExists) {
    // Vytvorenie nového úspechu
    const newAchievement = {
      id,
      title,
      description,
      points,
      date: new Date().toISOString()
    };
    
    // Pridanie úspechu
    achievements.push(newAchievement);
    
    // Pridanie bodov
    addPoints(points, `Získali ste úspech: ${title}`);
    
    // Zobrazenie notifikácie
    showNotification('Nový úspech!', `${title}: ${description}`);
    
    // Uloženie úspechov
    saveUserData();
    
    // Kontrola odznakov
    checkBadges();
    
    return true;
  }
  
  return false;
}

// Pridanie bodov
function addPoints(points, reason) {
  // Pridanie bodov
  userPoints += points;
  
  // Aktualizácia postupu
  userProgress += points;
  
  // Kontrola, či používateľ dosiahol novú úroveň
  const pointsForNextLevel = getPointsForNextLevel();
  if (userProgress >= pointsForNextLevel) {
    // Zvýšenie úrovne
    userLevel++;
    
    // Reset postupu
    userProgress -= pointsForNextLevel;
    
    // Zobrazenie notifikácie
    showNotification('Nová úroveň!', `Dosiahli ste úroveň ${userLevel}!`);
  }
  
  // Aktualizácia zobrazenia bodov
  updatePointsDisplay();
  
  // Uloženie údajov
  saveUserData();
}

// Aktualizácia zobrazenia bodov
function updatePointsDisplay() {
  // Aktualizácia bodov v gamifikačnom paneli
  const pointsElement = document.querySelector('.gamification-points');
  if (pointsElement) {
    pointsElement.innerHTML = `${userPoints} <span data-i18n="gamification.points">bodov</span>`;
  }
  
  // Aktualizácia úrovne
  const levelElement = document.querySelector('.gamification-level');
  if (levelElement) {
    levelElement.textContent = userLevel;
  }
  
  // Aktualizácia postupu
  const progressBar = document.querySelector('.gamification-progress-bar');
  if (progressBar) {
    progressBar.style.width = `${calculateLevelProgress()}%`;
  }
  
  // Aktualizácia textu postupu
  const progressText = document.querySelector('.gamification-progress-text');
  if (progressText) {
    progressText.innerHTML = `${userProgress}/${getPointsForNextLevel()} <span data-i18n="gamification.pointsToNextLevel">bodov do ďalšej úrovne</span>`;
  }
}

// Výpočet postupu úrovne v percentách
function calculateLevelProgress() {
  const pointsForNextLevel = getPointsForNextLevel();
  return Math.min(100, Math.round((userProgress / pointsForNextLevel) * 100));
}

// Získanie bodov potrebných pre ďalšiu úroveň
function getPointsForNextLevel() {
  // Jednoduchý vzorec: 50 * úroveň
  return 50 * userLevel;
}

// Zobrazenie notifikácie
function showNotification(title, message) {
  // Vytvorenie notifikácie
  const notification = document.createElement('div');
  notification.className = 'gamification-notification';
  notification.innerHTML = `
    <div class="gamification-notification-icon">
      <i class="fas fa-trophy"></i>
    </div>
    <div class="gamification-notification-content">
      <h4>${title}</h4>
      <p>${message}</p>
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

// Formátovanie dátumu
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Inicializácia po načítaní DOM
document.addEventListener('DOMContentLoaded', () => {
  // Pridanie úspechu za návštevu stránky
  addAchievement('welcome', 'Vitajte v kaštieli', 'Navštívili ste stránku kaštieľa Bošany.', 5);
  
  // Inicializácia gamifikácie
  initGamification();
});

// Export funkcií pre použitie v iných súboroch
window.addAchievement = addAchievement;
window.addPoints = addPoints;
window.showNotification = showNotification;