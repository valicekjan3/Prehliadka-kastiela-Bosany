import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import TourScreen from '../screens/TourScreen';
import HistoryScreen from '../screens/HistoryScreen';
import GalleryScreen from '../screens/GalleryScreen';
import EventsScreen from '../screens/EventsScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import LanguageScreen from '../screens/LanguageScreen';
import ARScreen from '../screens/ARScreen';
import TourDetailScreen from '../screens/TourDetailScreen';
import HistoryDetailScreen from '../screens/HistoryDetailScreen';
import GalleryDetailScreen from '../screens/GalleryDetailScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

// Import custom drawer content
import CustomDrawerContent from '../components/CustomDrawerContent';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Home Stack Navigator
const HomeStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: theme.typography.headingFontFamily,
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
      <Stack.Screen name="GalleryDetail" component={GalleryDetailScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="AR" component={ARScreen} />
    </Stack.Navigator>
  );
};

// Tour Stack Navigator
const TourStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: theme.typography.headingFontFamily,
        },
      }}
    >
      <Stack.Screen name="TourScreen" component={TourScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} />
      <Stack.Screen name="AR" component={ARScreen} />
    </Stack.Navigator>
  );
};

// History Stack Navigator
const HistoryStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: theme.typography.headingFontFamily,
        },
      }}
    >
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
    </Stack.Navigator>
  );
};

// Gallery Stack Navigator
const GalleryStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: theme.typography.headingFontFamily,
        },
      }}
    >
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GalleryDetail" component={GalleryDetailScreen} />
    </Stack.Navigator>
  );
};

// Events Stack Navigator
const EventsStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: theme.typography.headingFontFamily,
        },
      }}
    >
      <Stack.Screen name="EventsScreen" component={EventsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
};

// Settings Stack Navigator
const SettingsStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: theme.typography.headingFontFamily,
        },
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const TabNavigator = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Ionicons;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tour') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'History') {
            IconComponent = FontAwesome5;
            iconName = 'history';
          } else if (route.name === 'Gallery') {
            iconName = focused ? 'images' : 'images-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarLabelStyle: {
          fontFamily: 'Roboto',
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ 
          title: t('navigation.home'),
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Tour" 
        component={TourStack} 
        options={{ 
          title: t('navigation.tour'),
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="History" 
        component={HistoryStack} 
        options={{ 
          title: t('navigation.history'),
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Gallery" 
        component={GalleryStack} 
        options={{ 
          title: t('navigation.gallery'),
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Events" 
        component={EventsStack} 
        options={{ 
          title: t('navigation.events'),
          headerShown: false 
        }} 
      />
    </Tab.Navigator>
  );
};

// Main Drawer Navigator
const AppNavigator = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: {
          fontFamily: 'Roboto',
          fontSize: 16,
          marginLeft: -20,
        },
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{
          title: t('navigation.home'),
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{
          title: t('navigation.quiz'),
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="head-question-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Achievements" 
        component={AchievementsScreen} 
        options={{
          title: t('achievements.title'),
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="trophy" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsStack} 
        options={{
          title: t('navigation.settings'),
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="About" 
        component={AboutScreen} 
        options={{
          title: t('navigation.about'),
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Contact" 
        component={ContactScreen} 
        options={{
          title: t('navigation.contact'),
          drawerIcon: ({ color }) => (
            <Ionicons name="mail-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;