import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Surface, ProgressBar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const AchievementBadge = ({ achievement, onPress }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Calculate progress percentage
  const progress = achievement.progress / achievement.total;
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Surface style={[styles.badge, { backgroundColor: theme.colors.surface }]}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.accent + '20' }]}>
          <MaterialCommunityIcons name={achievement.icon} size={28} color={theme.colors.accent} />
        </View>
        <Text 
          style={[styles.title, { color: theme.colors.text }]}
          numberOfLines={1}
        >
          {achievement.title}
        </Text>
        <Text 
          style={[styles.description, { color: theme.colors.secondary }]}
          numberOfLines={2}
        >
          {achievement.description}
        </Text>
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={progress} 
            color={theme.colors.accent}
            style={styles.progressBar}
          />
          <Text style={[styles.progressText, { color: theme.colors.secondary }]}>
            {achievement.progress}/{achievement.total}
          </Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
  },
  badge: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
    height: 32,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
});

export default AchievementBadge;