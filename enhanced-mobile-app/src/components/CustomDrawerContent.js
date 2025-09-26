import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { 
  Text, 
  Divider, 
  Avatar, 
  useTheme 
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

// Import language selector component
import LanguageSelector from './LanguageSelector';

const CustomDrawerContent = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Image
          source={require('../../assets/castle-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: '#fff', fontFamily: theme.typography.decorativeFontFamily }]}>
          {t('app.name')}
        </Text>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        
        <Divider style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        
        {/* Language Selector */}
        <View style={styles.languageSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('settings.language')}
          </Text>
          <LanguageSelector compact={true} />
        </View>
        
        <Divider style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        
        {/* User Points and Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('achievements.points')}
          </Text>
          <View style={styles.pointsContainer}>
            <View style={[styles.pointsBadge, { backgroundColor: theme.colors.accent }]}>
              <Text style={styles.pointsText}>120</Text>
            </View>
            <View style={styles.levelContainer}>
              <Text style={[styles.levelLabel, { color: theme.colors.text }]}>
                {t('achievements.level')}
              </Text>
              <Text style={[styles.levelValue, { color: theme.colors.primary }]}>3</Text>
            </View>
          </View>
          
          {/* Recent Achievements */}
          <View style={styles.recentAchievements}>
            <Text style={[styles.recentTitle, { color: theme.colors.text }]}>
              {t('achievements.unlocked')}
            </Text>
            <View style={styles.badgesRow}>
              <Avatar.Icon 
                size={40} 
                icon="camera" 
                style={{ backgroundColor: theme.colors.accent }} 
              />
              <Avatar.Icon 
                size={40} 
                icon="book" 
                style={{ backgroundColor: theme.colors.accent }} 
              />
              <Avatar.Icon 
                size={40} 
                icon="map-marker" 
                style={{ backgroundColor: theme.colors.accent }} 
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.footerButton, { borderTopColor: theme.colors.border }]}
          onPress={() => props.navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={22} color={theme.colors.text} />
          <Text style={[styles.footerText, { color: theme.colors.text }]}>
            {t('navigation.settings')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 15,
    height: 1,
  },
  languageSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pointsBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  pointsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelContainer: {
    flexDirection: 'column',
  },
  levelLabel: {
    fontSize: 14,
  },
  levelValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  recentAchievements: {
    marginTop: 5,
  },
  recentTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  footer: {
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footerText: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default CustomDrawerContent;