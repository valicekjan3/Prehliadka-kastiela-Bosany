// Kvízové otázky
const quizQuestions = {
  sk: [
    {
      question: "V ktorom storočí bol postavený kaštieľ Bošany?",
      options: ["15. storočie", "16. storočie", "17. storočie", "18. storočie"],
      correctAnswer: 1,
      explanation: "Kaštieľ Bošany bol postavený v 16. storočí rodom Bossányiovcov na základoch hrádku."
    },
    {
      question: "Kto navštívil kaštieľ v 18. storočí?",
      options: ["Kráľ Matej Korvín", "Cisár František Jozef", "Kráľovná Mária Terézia", "Napoleon Bonaparte"],
      correctAnswer: 2,
      explanation: "V 18. storočí kaštieľ navštívila kráľovná Mária Terézia z rodu Habsburgovcov."
    },
    {
      question: "Kto sa stal majiteľom kaštieľa v roku 2007?",
      options: ["Obec Bošany", "Ján Miškeje", "Ministerstvo kultúry", "Zahraničný investor"],
      correctAnswer: 1,
      explanation: "V roku 2007 sa novým majiteľom kaštieľa stal miestny podnikateľ Ján Miškeje."
    },
    {
      question: "Čo sa nachádzalo na mieste dnešného kaštieľa pred jeho výstavbou?",
      options: ["Kostol", "Zrubová stavba (kúria)", "Rímska pevnosť", "Nič, bolo to prázdne pole"],
      correctAnswer: 1,
      explanation: "Na mieste dnešného kaštieľa stála pôvodne väčšia zrubová stavba, pravdepodobne kúria, ktorá zanikla kvôli požiaru."
    },
    {
      question: "V ktorých rokoch prebehla komplexná rekonštrukcia kaštieľa?",
      options: ["2000 - 2002", "2005 - 2007", "2011 - 2013", "2018 - 2020"],
      correctAnswer: 2,
      explanation: "Komplexná rekonštrukcia kaštieľa prebehla v rokoch 2011 - 2013."
    }
  ],
  en: [
    {
      question: "In which century was Bošany Castle built?",
      options: ["15th century", "16th century", "17th century", "18th century"],
      correctAnswer: 1,
      explanation: "Bošany Castle was built in the 16th century by the Bossányi family on the foundations of a small fort."
    },
    {
      question: "Who visited the castle in the 18th century?",
      options: ["King Matthias Corvinus", "Emperor Franz Joseph", "Queen Maria Theresa", "Napoleon Bonaparte"],
      correctAnswer: 2,
      explanation: "In the 18th century, the castle was visited by Queen Maria Theresa of the Habsburg dynasty."
    },
    {
      question: "Who became the owner of the castle in 2007?",
      options: ["Bošany village", "Ján Miškeje", "Ministry of Culture", "Foreign investor"],
      correctAnswer: 1,
      explanation: "In 2007, local entrepreneur Ján Miškeje became the new owner of the castle."
    },
    {
      question: "What was on the site of today's castle before it was built?",
      options: ["Church", "Log building (manor house)", "Roman fortress", "Nothing, it was an empty field"],
      correctAnswer: 1,
      explanation: "On the site of today's castle, there was originally a larger log building, probably a manor house, which was destroyed by fire."
    },
    {
      question: "In which years did the comprehensive reconstruction of the castle take place?",
      options: ["2000 - 2002", "2005 - 2007", "2011 - 2013", "2018 - 2020"],
      correctAnswer: 2,
      explanation: "The comprehensive reconstruction of the castle took place in 2011 - 2013."
    }
  ],
  de: [
    {
      question: "In welchem Jahrhundert wurde Schloss Bošany erbaut?",
      options: ["15. Jahrhundert", "16. Jahrhundert", "17. Jahrhundert", "18. Jahrhundert"],
      correctAnswer: 1,
      explanation: "Schloss Bošany wurde im 16. Jahrhundert von der Familie Bossányi auf den Grundmauern einer kleinen Festung erbaut."
    },
    {
      question: "Wer besuchte das Schloss im 18. Jahrhundert?",
      options: ["König Matthias Corvinus", "Kaiser Franz Joseph", "Königin Maria Theresia", "Napoleon Bonaparte"],
      correctAnswer: 2,
      explanation: "Im 18. Jahrhundert wurde das Schloss von Königin Maria Theresia aus der Habsburger-Dynastie besucht."
    },
    {
      question: "Wer wurde 2007 Eigentümer des Schlosses?",
      options: ["Dorf Bošany", "Ján Miškeje", "Kulturministerium", "Ausländischer Investor"],
      correctAnswer: 1,
      explanation: "Im Jahr 2007 wurde der lokale Unternehmer Ján Miškeje neuer Eigentümer des Schlosses."
    },
    {
      question: "Was befand sich an der Stelle des heutigen Schlosses, bevor es gebaut wurde?",
      options: ["Kirche", "Blockhaus (Herrenhaus)", "Römische Festung", "Nichts, es war ein leeres Feld"],
      correctAnswer: 1,
      explanation: "An der Stelle des heutigen Schlosses stand ursprünglich ein größeres Blockhaus, wahrscheinlich ein Herrenhaus, das durch einen Brand zerstört wurde."
    },
    {
      question: "In welchen Jahren fand die umfassende Rekonstruktion des Schlosses statt?",
      options: ["2000 - 2002", "2005 - 2007", "2011 - 2013", "2018 - 2020"],
      correctAnswer: 2,
      explanation: "Die umfassende Rekonstruktion des Schlosses fand in den Jahren 2011 - 2013 statt."
    }
  ]
};

// Inicializácia kvízu
function initQuiz() {
  // Vytvorenie kontajnera pre kvíz
  const quizContainer = document.createElement('div');
  quizContainer.className = 'quiz-container';
  quizContainer.innerHTML = `
    <div class="quiz-header">
      <h3 data-i18n="gamification.quizTitle">Kvíz o kaštieli</h3>
      <button class="quiz-start-btn" data-i18n="gamification.quizStart">Začať kvíz</button>
    </div>
    <div class="quiz-content" style="display: none;">
      <div class="quiz-question-container">
        <h4><span data-i18n="gamification.quizQuestion">Otázka</span> <span class="quiz-question-number">1</span>/5</h4>
        <p class="quiz-question-text"></p>
        <div class="quiz-options"></div>
      </div>
      <div class="quiz-navigation">
        <button class="quiz-next-btn" data-i18n="gamification.quizNext">Ďalej</button>
        <button class="quiz-submit-btn" style="display: none;" data-i18n="gamification.quizSubmit">Odoslať</button>
      </div>
    </div>
    <div class="quiz-result" style="display: none;">
      <h3 data-i18n="gamification.quizResult">Výsledok</h3>
      <p class="quiz-score"></p>
      <div class="quiz-explanation"></div>
      <button class="quiz-try-again-btn" data-i18n="gamification.quizTryAgain">Skúsiť znova</button>
    </div>
  `;
  
  // Pridanie kvízu do DOM
  const tourSection = document.querySelector('#tour');
  if (tourSection) {
    const container = tourSection.querySelector('.container');
    if (container) {
      container.appendChild(quizContainer);
    }
  }
  
  // Pridanie štýlov pre kvíz
  addQuizStyles();
  
  // Inicializácia event listenerov
  initQuizEvents();
}

// Pridanie štýlov pre kvíz
function addQuizStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .quiz-container {
      margin-top: 60px;
      background-color: #fff;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 30px;
    }
    
    .quiz-header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .quiz-header h3 {
      font-family: var(--header-font);
      color: var(--primary-color);
      margin-bottom: 20px;
    }
    
    .quiz-start-btn {
      padding: 12px 24px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      border: none;
      border-radius: var(--border-radius);
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .quiz-start-btn:hover {
      background-color: var(--secondary-color);
      transform: translateY(-2px);
    }
    
    .quiz-content {
      margin-bottom: 20px;
    }
    
    .quiz-question-container {
      margin-bottom: 30px;
    }
    
    .quiz-question-container h4 {
      font-family: var(--header-font);
      color: var(--primary-color);
      margin-bottom: 15px;
    }
    
    .quiz-question-text {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    
    .quiz-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .quiz-option {
      padding: 15px;
      background-color: var(--background-color);
      border: 2px solid transparent;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
    }
    
    .quiz-option:hover {
      background-color: #e0e0e0;
    }
    
    .quiz-option.selected {
      border-color: var(--primary-color);
      background-color: rgba(139, 69, 19, 0.1);
    }
    
    .quiz-option.correct {
      border-color: #4caf50;
      background-color: rgba(76, 175, 80, 0.1);
    }
    
    .quiz-option.incorrect {
      border-color: #f44336;
      background-color: rgba(244, 67, 54, 0.1);
    }
    
    .quiz-navigation {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    
    .quiz-next-btn,
    .quiz-submit-btn,
    .quiz-try-again-btn {
      padding: 10px 20px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
    }
    
    .quiz-next-btn:hover,
    .quiz-submit-btn:hover,
    .quiz-try-again-btn:hover {
      background-color: var(--secondary-color);
    }
    
    .quiz-next-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .quiz-result {
      text-align: center;
    }
    
    .quiz-result h3 {
      font-family: var(--header-font);
      color: var(--primary-color);
      margin-bottom: 20px;
    }
    
    .quiz-score {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    
    .quiz-explanation {
      margin-bottom: 30px;
    }
    
    .quiz-explanation-item {
      margin-bottom: 15px;
      padding: 15px;
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      text-align: left;
    }
    
    .quiz-explanation-item h5 {
      font-family: var(--header-font);
      color: var(--primary-color);
      margin-bottom: 10px;
    }
    
    .quiz-explanation-item p {
      margin-bottom: 5px;
    }
    
    .quiz-explanation-item .correct-answer {
      color: #4caf50;
      font-weight: bold;
    }
    
    .quiz-explanation-item .user-answer {
      font-weight: bold;
    }
    
    .quiz-explanation-item .user-answer.correct {
      color: #4caf50;
    }
    
    .quiz-explanation-item .user-answer.incorrect {
      color: #f44336;
    }
  `;
  
  document.head.appendChild(style);
}

// Inicializácia event listenerov pre kvíz
function initQuizEvents() {
  // Získanie elementov
  const startButton = document.querySelector('.quiz-start-btn');
  const quizContent = document.querySelector('.quiz-content');
  const quizResult = document.querySelector('.quiz-result');
  const nextButton = document.querySelector('.quiz-next-btn');
  const submitButton = document.querySelector('.quiz-submit-btn');
  const tryAgainButton = document.querySelector('.quiz-try-again-btn');
  
  // Premenné pre kvíz
  let currentQuestion = 0;
  let userAnswers = [];
  let questions = [];
  
  // Event listener pre tlačidlo štart
  if (startButton) {
    startButton.addEventListener('click', () => {
      startButton.style.display = 'none';
      quizContent.style.display = 'block';
      
      // Získanie otázok pre aktuálny jazyk
      questions = quizQuestions[currentLanguage] || quizQuestions.sk;
      
      // Zobrazenie prvej otázky
      showQuestion(0);
      
      // Pridanie bodov za začatie kvízu (gamifikácia)
      if (typeof addAchievement === 'function') {
        addAchievement('quiz_starter', 'Kvízový začiatočník', 'Začali ste kvíz o kaštieli!', 5);
      }
    });
  }
  
  // Event listener pre tlačidlo ďalej
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      // Kontrola, či je vybraná odpoveď
      const selectedOption = document.querySelector('.quiz-option.selected');
      if (!selectedOption) return;
      
      // Uloženie odpovede
      userAnswers[currentQuestion] = parseInt(selectedOption.dataset.index);
      
      // Prechod na ďalšiu otázku
      currentQuestion++;
      
      // Kontrola, či sme na poslednej otázke
      if (currentQuestion === questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
      }
      
      // Zobrazenie ďalšej otázky
      showQuestion(currentQuestion);
    });
  }
  
  // Event listener pre tlačidlo odoslať
  if (submitButton) {
    submitButton.addEventListener('click', () => {
      // Kontrola, či je vybraná odpoveď
      const selectedOption = document.querySelector('.quiz-option.selected');
      if (!selectedOption) return;
      
      // Uloženie poslednej odpovede
      userAnswers[currentQuestion] = parseInt(selectedOption.dataset.index);
      
      // Zobrazenie výsledku
      showResult();
    });
  }
  
  // Event listener pre tlačidlo skúsiť znova
  if (tryAgainButton) {
    tryAgainButton.addEventListener('click', () => {
      // Reset kvízu
      currentQuestion = 0;
      userAnswers = [];
      
      // Zobrazenie prvej otázky
      quizResult.style.display = 'none';
      quizContent.style.display = 'block';
      nextButton.style.display = 'block';
      submitButton.style.display = 'none';
      
      showQuestion(0);
    });
  }
}

// Zobrazenie otázky
function showQuestion(index) {
  // Získanie otázok pre aktuálny jazyk
  const questions = quizQuestions[currentLanguage] || quizQuestions.sk;
  
  // Kontrola, či index je platný
  if (index < 0 || index >= questions.length) return;
  
  // Získanie elementov
  const questionNumber = document.querySelector('.quiz-question-number');
  const questionText = document.querySelector('.quiz-question-text');
  const optionsContainer = document.querySelector('.quiz-options');
  const nextButton = document.querySelector('.quiz-next-btn');
  
  // Nastavenie čísla otázky
  if (questionNumber) {
    questionNumber.textContent = index + 1;
  }
  
  // Nastavenie textu otázky
  if (questionText) {
    questionText.textContent = questions[index].question;
  }
  
  // Vyčistenie možností
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    
    // Pridanie možností
    questions[index].options.forEach((option, i) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'quiz-option';
      optionElement.dataset.index = i;
      optionElement.textContent = option;
      
      // Kontrola, či je možnosť už vybraná
      if (userAnswers[index] === i) {
        optionElement.classList.add('selected');
      }
      
      // Pridanie event listenera
      optionElement.addEventListener('click', () => {
        // Odstránenie selected triedy zo všetkých možností
        document.querySelectorAll('.quiz-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        
        // Pridanie selected triedy na kliknutú možnosť
        optionElement.classList.add('selected');
        
        // Povolenie tlačidla ďalej
        if (nextButton) {
          nextButton.disabled = false;
        }
      });
      
      optionsContainer.appendChild(optionElement);
    });
  }
  
  // Zakázanie tlačidla ďalej, kým nie je vybraná možnosť
  if (nextButton) {
    nextButton.disabled = userAnswers[index] === undefined;
  }
}

// Zobrazenie výsledku
function showResult() {
  // Získanie otázok pre aktuálny jazyk
  const questions = quizQuestions[currentLanguage] || quizQuestions.sk;
  
  // Získanie elementov
  const quizContent = document.querySelector('.quiz-content');
  const quizResult = document.querySelector('.quiz-result');
  const scoreElement = document.querySelector('.quiz-score');
  const explanationElement = document.querySelector('.quiz-explanation');
  
  // Výpočet skóre
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      score++;
    }
  });
  
  // Zobrazenie skóre
  if (scoreElement) {
    const scoreText = getTranslation('gamification.quizScore') || 'Skóre';
    scoreElement.textContent = `${scoreText}: ${score}/${questions.length}`;
  }
  
  // Vytvorenie vysvetlenia
  if (explanationElement) {
    explanationElement.innerHTML = '';
    
    questions.forEach((question, index) => {
      const explanationItem = document.createElement('div');
      explanationItem.className = 'quiz-explanation-item';
      
      const isCorrect = userAnswers[index] === question.correctAnswer;
      
      explanationItem.innerHTML = `
        <h5>${index + 1}. ${question.question}</h5>
        <p><span class="correct-answer">${getTranslation('gamification.quizCorrect') || 'Správna odpoveď'}: ${question.options[question.correctAnswer]}</span></p>
        <p>${getTranslation('gamification.quizYourAnswer') || 'Vaša odpoveď'}: <span class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">${question.options[userAnswers[index]]}</span></p>
        <p>${question.explanation}</p>
      `;
      
      explanationElement.appendChild(explanationItem);
    });
  }
  
  // Skrytie obsahu kvízu a zobrazenie výsledku
  if (quizContent && quizResult) {
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
  }
  
  // Pridanie bodov za dokončenie kvízu (gamifikácia)
  if (typeof addAchievement === 'function') {
    // Výpočet bodov na základe skóre
    const points = score * 5;
    
    // Pridanie úspechu
    addAchievement('quiz_completed', 'Kvízový majster', `Dokončili ste kvíz s výsledkom ${score}/${questions.length}!`, points);
    
    // Pridanie extra úspechu za plný počet bodov
    if (score === questions.length) {
      addAchievement('quiz_perfect', 'Dokonalý znalec', 'Získali ste plný počet bodov v kvíze!', 20);
    }
  }
}

// Inicializácia kvízu po načítaní DOM
document.addEventListener('DOMContentLoaded', () => {
  // Počkáme na načítanie hlavného skriptu
  const checkInterval = setInterval(() => {
    if (typeof currentLanguage !== 'undefined' && typeof getTranslation === 'function') {
      clearInterval(checkInterval);
      initQuiz();
    }
  }, 100);
});