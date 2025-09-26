import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  ImageBackground, 
  TouchableOpacity, 
  Image,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { 
  Text, 
  Button, 
  Card, 
  Title, 
  Paragraph, 
  useTheme,
  ActivityIndicator
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  interpolate 
} from 'react-native-reanimated';

// Import components
import FeatureCard from '../components/FeatureCard';
import EventCard from '../components/EventCard';
import AchievementBadge from '../components/AchievementBadge';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 120 : 100;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  
  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const headerHeight = interpolate(
      scrollY.value,
      [0, 100],
      [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
      'clamp'
    );
    
    const opacity = interpolate(
      scrollY.value,
      [0, 50, 100],
      [1, 0.5, 0],
      'clamp'
    );
    
    return {
      height: headerHeight,
      opacity: opacity,
    };
  });
  
  const titleAnimatedStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, 100],
      [32, 24],
      'clamp'
    );
    
    const paddingTop = interpolate(
      scrollY.value,
      [0, 100],
      [20, 10],
      'clamp'
    );
    
    return {
      fontSize,
      paddingTop,
    };
  });
  
  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        // In a real app, you would fetch data from an API or local storage
        // For now, we'll just simulate a delay and use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock events data
        const mockEvents = [
          {
            id: '1',
            title: 'Castle Tour with Historian',
            date: '2025-10-15T14:00:00',
            image: require('../../assets/events/event1.jpg'),
          },
          {
            id: '2',
            title: 'Medieval Festival',
            date: '2025-11-05T10:00:00',
            image: require('../../assets/events/event2.jpg'),
          },
          {
            id: '3',
            title: 'Art Exhibition Opening',
            date: '2025-10-20T18:00:00',
            image: require('../../assets/events/event3.jpg'),
          },
        ];
        
        // Mock achievements data
        const mockAchievements = [
          {
            id: '1',
            title: 'Explorer',
            description: 'Visit all castle rooms',
            icon: 'compass',
            progress: 60,
            total: 100,
          },
          {
            id: '2',
            title: 'Historian',
            description: 'Learn about castle history',
            icon: 'book',
            progress: 30,
            total: 100,
          },
          {
            id: '3',
            title: 'Photographer',
            description: 'Take photos of all exhibits',
            icon: 'camera',
            progress: 45,
            total: 100,
          },
        ];
        
        setEvents(mockEvents);
        setAchievements(mockAchievements);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          {t('app.loading')}
        </Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Header */}
      <Animated.View style={[
        styles.header, 
        { backgroundColor: theme.colors.primary },
        headerAnimatedStyle
      ]}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        
        <Animated.Text style={[
          styles.headerTitle,
          { 
            fontFamily: theme.typography.decorativeFontFamily,
            color: '#fff' 
          },
          titleAnimatedStyle
        ]}>
          {t('app.name')}
        </Animated.Text>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      
      {/* Main Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={require('../../assets/castle-hero.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={[styles.heroOverlay, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
              <Text style={[styles.heroTitle, { fontFamily: theme.typography.headingFontFamily }]}>
                {t('home.welcome')}
              </Text>
              <Text style={styles.heroSubtitle}>
                {t('home.subtitle')}
              </Text>
              <Button
                mode="contained"
                style={[styles.heroButton, { backgroundColor: theme.colors.accent }]}
                labelStyle={{ color: '#000', fontWeight: 'bold' }}
                onPress={() => navigation.navigate('Tour')}
              >
                {t('home.startTour')}
              </Button>
            </View>
          </ImageBackground>
        </View>
        
        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.headingFontFamily }]}>
            {t('home.continueExploring')}
          </Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuresScroll}
          >
            <FeatureCard
              title={t('navigation.tour')}
              icon="compass-outline"
              color={theme.colors.primary}
              onPress={() => navigation.navigate('Tour')}
            />
            <FeatureCard
              title={t('navigation.history')}
              icon="book-outline"
              color={theme.colors.tertiary}
              onPress={() => navigation.navigate('History')}
            />
            <FeatureCard
              title={t('navigation.gallery')}
              icon="images-outline"
              color={theme.colors.quaternary}
              onPress={() => navigation.navigate('Gallery')}
            />
            <FeatureCard
              title={t('navigation.quiz')}
              icon="help-circle-outline"
              color={theme.colors.highlight}
              onPress={() => navigation.navigate('Quiz')}
            />
          </ScrollView>
        </View>
        
        {/* Featured Exhibit */}
        <View style={styles.featuredContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.headingFontFamily }]}>
            {t('home.featuredExhibit')}
          </Text>
          
          <Card style={styles.featuredCard}>
            <Card.Cover source={require('../../assets/featured-exhibit.jpg')} />
            <Card.Content>
              <Title style={{ fontFamily: theme.typography.headingFontFamily }}>
                Renaissance Architecture
              </Title>
              <Paragraph>
                Discover the unique architectural elements that make Bošany Castle a remarkable example of Renaissance design in Slovakia.
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="text" 
                onPress={() => navigation.navigate('HistoryDetail', { id: 'architecture' })}
                color={theme.colors.primary}
              >
                {t('common.more')}
              </Button>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('TourDetail', { id: 'architecture' })}
                style={{ backgroundColor: theme.colors.primary }}
              >
                {t('tour.startTour')}
              </Button>
            </Card.Actions>
          </Card>
        </View>
        
        {/* Upcoming Events */}
        <View style={styles.eventsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.headingFontFamily }]}>
              {t('home.upcomingEvents')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                {t('common.more')}
              </Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsScroll}
          >
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => navigation.navigate('EventDetail', { id: event.id })}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.headingFontFamily }]}>
              {t('home.achievements')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                {t('common.more')}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.achievementsGrid}>
            {achievements.map(achievement => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                onPress={() => navigation.navigate('Achievements')}
              />
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 32,
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT,
  },
  heroContainer: {
    width: '100%',
    height: height * 0.5,
    maxHeight: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  heroButton: {
    paddingHorizontal: 16,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featuresScroll: {
    paddingRight: 20,
  },
  featuredContainer: {
    padding: 20,
  },
  featuredCard: {
    elevation: 4,
  },
  eventsContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 16,
  },
  eventsScroll: {
    paddingRight: 20,
  },
  achievementsContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;