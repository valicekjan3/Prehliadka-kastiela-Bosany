import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text, Modal, Portal, Button, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

// Import language utilities
import { supportedLanguages, changeLanguage, getCurrentLanguageInfo } from '../i18n/i18n';

const LanguageSelector = ({ compact = false }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const currentLanguage = getCurrentLanguageInfo();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleLanguageChange = async (langCode) => {
    await changeLanguage(langCode);
    hideModal();
  };

  // Function to get flag image based on country code
  const getFlagImage = (countryCode) => {
    try {
      return require(`../../assets/flags/${countryCode.toLowerCase()}.png`);
    } catch (e) {
      // Fallback to a placeholder if flag image is not found
      return require('../../assets/flags/placeholder.png');
    }
  };

  // Compact language selector (for drawer)
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <TouchableOpacity
          style={[styles.compactButton, { borderColor: theme.colors.border }]}
          onPress={showModal}
        >
          <Image
            source={getFlagImage(currentLanguage.flag)}
            style={styles.compactFlag}
          />
          <Text style={[styles.compactText, { color: theme.colors.text }]}>
            {currentLanguage.name}
          </Text>
          <Ionicons name="chevron-down" size={16} color={theme.colors.text} />
        </TouchableOpacity>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={[
              styles.modalContainer,
              { backgroundColor: theme.colors.surface }
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
              {t('settings.language')}
            </Text>
            <ScrollView style={styles.languageList}>
              {supportedLanguages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageItem,
                    i18n.language === lang.code && {
                      backgroundColor: theme.colors.primary + '20',
                    },
                  ]}
                  onPress={() => handleLanguageChange(lang.code)}
                >
                  <Image
                    source={getFlagImage(lang.flag)}
                    style={styles.flag}
                  />
                  <Text
                    style={[
                      styles.languageName,
                      { color: theme.colors.text },
                      i18n.language === lang.code && {
                        fontWeight: 'bold',
                        color: theme.colors.primary,
                      },
                    ]}
                  >
                    {lang.name}
                  </Text>
                  {i18n.language === lang.code && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={theme.colors.primary}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              mode="contained"
              onPress={hideModal}
              style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
            >
              {t('common.close')}
            </Button>
          </Modal>
        </Portal>
      </View>
    );
  }

  // Full language selector (for settings screen)
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {t('settings.language')}
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
        {t('settings.language')}
      </Text>

      <TouchableOpacity
        style={[styles.selectorButton, { borderColor: theme.colors.border }]}
        onPress={showModal}
      >
        <View style={styles.currentLanguage}>
          <Image
            source={getFlagImage(currentLanguage.flag)}
            style={styles.flag}
          />
          <Text style={[styles.languageName, { color: theme.colors.text }]}>
            {currentLanguage.name}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalContainer,
            { backgroundColor: theme.colors.surface }
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
            {t('settings.language')}
          </Text>
          <ScrollView style={styles.languageList}>
            {supportedLanguages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  i18n.language === lang.code && {
                    backgroundColor: theme.colors.primary + '20',
                  },
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <Image
                  source={getFlagImage(lang.flag)}
                  style={styles.flag}
                />
                <Text
                  style={[
                    styles.languageName,
                    { color: theme.colors.text },
                    i18n.language === lang.code && {
                      fontWeight: 'bold',
                      color: theme.colors.primary,
                    },
                  ]}
                >
                  {lang.name}
                </Text>
                {i18n.language === lang.code && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={theme.colors.primary}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button
            mode="contained"
            onPress={hideModal}
            style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
          >
            {t('common.close')}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  currentLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 12,
    borderRadius: 2,
  },
  languageName: {
    fontSize: 16,
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageList: {
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  closeButton: {
    marginTop: 8,
  },
  compactContainer: {
    paddingHorizontal: 0,
  },
  compactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  compactFlag: {
    width: 20,
    height: 14,
    marginRight: 8,
    borderRadius: 2,
  },
  compactText: {
    fontSize: 14,
    marginRight: 4,
  },
});

export default LanguageSelector;