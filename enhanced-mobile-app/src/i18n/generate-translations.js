/**
 * Script to generate placeholder translation files for all 22 supported languages
 * This script will create JSON files for each language based on the English template
 */

const fs = require('fs');
const path = require('path');

// Define all supported languages
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

// Path to translations directory
const translationsDir = path.join(__dirname, 'translations');

// Create translations directory if it doesn't exist
if (!fs.existsSync(translationsDir)) {
  fs.mkdirSync(translationsDir, { recursive: true });
  console.log(`Created directory: ${translationsDir}`);
}

// Read the English template file
const englishFilePath = path.join(translationsDir, 'en.json');
let englishTemplate;

try {
  englishTemplate = JSON.parse(fs.readFileSync(englishFilePath, 'utf8'));
  console.log('Successfully loaded English template file');
} catch (error) {
  console.error('Error reading English template file:', error);
  process.exit(1);
}

// Function to create a placeholder translation file
function createPlaceholderTranslation(langCode) {
  // For demonstration purposes, we're just creating placeholder files
  // In a production environment, you would use professional translation services
  
  // For existing files, don't overwrite them
  const filePath = path.join(translationsDir, `${langCode}.json`);
  if (fs.existsSync(filePath) && langCode !== 'en' && langCode !== 'sk') {
    console.log(`File already exists: ${filePath}`);
    return;
  }
  
  // For Slovak, we already have a translation
  if (langCode === 'sk') {
    console.log(`Slovak translation already exists: ${filePath}`);
    return;
  }
  
  // For English, we already have the template
  if (langCode === 'en') {
    console.log(`English template already exists: ${filePath}`);
    return;
  }
  
  // Create a copy of the English template
  const translation = JSON.parse(JSON.stringify(englishTemplate));
  
  // Write the file
  fs.writeFileSync(filePath, JSON.stringify(translation, null, 2));
  console.log(`Created language file: ${filePath}`);
}

// Generate language files for all supported languages
supportedLanguages.forEach(lang => {
  createPlaceholderTranslation(lang.code);
});

console.log('Language file generation complete!');