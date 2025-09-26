import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const FeatureCard = ({ title, icon, color, onPress }) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={32} color={color} />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 120,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FeatureCard;