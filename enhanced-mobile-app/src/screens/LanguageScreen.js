import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  StatusBar
} from 'react-native';
import { 
  Text, 
  Appbar, 
  Searchbar, 
  Divider, 
  useTheme 
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import language utilities
import { supportedLanguages, changeLanguage } from '../i18n/i18n';

const LanguageScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(supportedLanguages);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLanguages(supportedLanguages);
    } else {
      const filtered = supportedLanguages.filter(lang => 
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLanguages(filtered);
    }
  }, [searchQuery]);

  const handleLanguageChange = async (langCode) => {
    await changeLanguage(langCode);
    navigation.goBack();
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

  const renderLanguageItem = ({ item }) => {
    const isSelected = i18n.language === item.code;
    
    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          isSelected && { backgroundColor: theme.colors.primary + '20' }
        ]}
        onPress={() => handleLanguageChange(item.code)}
      >
        <Image
          source={getFlagImage(item.flag)}
          style={styles.flag}
        />
        <View style={styles.languageInfo}>
          <Text
            style={[
              styles.languageName,
              { color: theme.colors.text },
              isSelected && { fontWeight: 'bold', color: theme.colors.primary }
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.languageCode,
              { color: theme.colors.secondary },
              isSelected && { color: theme.colors.primary }
            ]}
          >
            {item.code.toUpperCase()}
          </Text>
        </View>
        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={theme.colors.primary}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content 
          title={t('settings.language')} 
          titleStyle={{ fontFamily: theme.typography.headingFontFamily, color: '#fff' }}
        />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Searchbar
          placeholder={t('common.search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchbar, { backgroundColor: theme.colors.surface }]}
          iconColor={theme.colors.primary}
          inputStyle={{ color: theme.colors.text }}
        />
        
        <View style={styles.languageListContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('settings.language')} ({filteredLanguages.length})
          </Text>
          
          <FlatList
            data={filteredLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.code}
            ItemSeparatorComponent={() => (
              <Divider style={{ backgroundColor: theme.colors.border }} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Ionicons name="search" size={48} color={theme.colors.secondary} />
                <Text style={[styles.emptyText, { color: theme.colors.secondary }]}>
                  {t('common.noResults')}
                </Text>
              </View>
            )}
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={20} color={theme.colors.secondary} />
          <Text style={[styles.infoText, { color: theme.colors.secondary }]}>
            {t('settings.languageInfo')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
    elevation: 2,
  },
  languageListContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  flag: {
    width: 32,
    height: 22,
    borderRadius: 2,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageCode: {
    fontSize: 12,
    marginTop: 2,
  },
  checkIcon: {
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});

export default LanguageScreen;