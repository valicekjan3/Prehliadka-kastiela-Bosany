import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const EventCard = ({ event, onPress }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Image 
          source={event.image} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text 
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {event.title}
          </Text>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={16} color={theme.colors.primary} />
            <Text style={[styles.date, { color: theme.colors.secondary }]}>
              {formatDate(event.date)}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color={theme.colors.primary} />
            <Text style={[styles.time, { color: theme.colors.secondary }]}>
              {formatTime(event.date)}
            </Text>
          </View>
        </View>
        <View style={[styles.button, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.buttonText}>{t('common.more')}</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 280,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    marginLeft: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    marginLeft: 6,
  },
  button: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default EventCard;