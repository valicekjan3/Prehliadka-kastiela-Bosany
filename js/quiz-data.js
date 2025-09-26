// Kvízové otázky pre rôzne jazyky
const quizData = {
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

// Export pre použitie v iných súboroch
if (typeof module !== 'undefined') {
  module.exports = quizData;
}