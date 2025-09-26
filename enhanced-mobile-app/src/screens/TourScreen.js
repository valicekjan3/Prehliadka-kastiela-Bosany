import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  StatusBar,
  Animated,
  Platform
} from 'react-native';
import { 
  Text, 
  Button, 
  Appbar, 
  Surface, 
  ActivityIndicator,
  useTheme
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const TourScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [tourLocations, setTourLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  
  useEffect(() => {
    // Simulate loading tour data
    const loadTourData = async () => {
      try {
        // In a real app, you would fetch data from an API or local storage
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock tour locations data
        const mockLocations = [
          {
            id: 'entrance',
            name: t('tour.locations.entrance.title'),
            description: t('tour.locations.entrance.description'),
            image: require('../../assets/tour/entrance.jpg'),
            position: { x: 100, y: 150 },
            model3D: 'entrance.glb',
          },
          {
            id: 'hall',
            name: t('tour.locations.hall.title'),
            description: t('tour.locations.hall.description'),
            image: require('../../assets/tour/hall.jpg'),
            position: { x: 200, y: 180 },
            model3D: 'hall.glb',
          },
          {
            id: 'library',
            name: t('tour.locations.library.title'),
            description: t('tour.locations.library.description'),
            image: require('../../assets/tour/library.jpg'),
            position: { x: 300, y: 120 },
            model3D: 'library.glb',
          },
          {
            id: 'bedroom',
            name: t('tour.locations.bedroom.title'),
            description: t('tour.locations.bedroom.description'),
            image: require('../../assets/tour/bedroom.jpg'),
            position: { x: 250, y: 250 },
            model3D: 'bedroom.glb',
          },
          {
            id: 'garden',
            name: t('tour.locations.garden.title'),
            description: t('tour.locations.garden.description'),
            image: require('../../assets/tour/garden.jpg'),
            position: { x: 150, y: 300 },
            model3D: 'garden.glb',
          },
        ];
        
        setTourLocations(mockLocations);
        setLoading(false);
      } catch (error) {
        console.error('Error loading tour data:', error);
        setLoading(false);
      }
    };
    
    loadTourData();
  }, [t]);
  
  useEffect(() => {
    if (selectedLocation) {
      // Animate in the location details
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Animate out the location details
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [selectedLocation, fadeAnim, slideAnim]);
  
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowMap(false);
  };
  
  const handleCloseDetails = () => {
    setSelectedLocation(null);
  };
  
  const handleStartAR = () => {
    navigation.navigate('AR', { locationId: selectedLocation.id });
  };
  
  const handleShowMap = () => {
    setShowMap(!showMap);
  };
  
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          {t('tour.loading')}
        </Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Action icon="menu" color="#fff" onPress={() => navigation.openDrawer()} />
        <Appbar.Content 
          title={t('tour.title')} 
          titleStyle={{ fontFamily: theme.typography.headingFontFamily, color: '#fff' }}
        />
        <Appbar.Action icon="map-outline" color="#fff" onPress={handleShowMap} />
      </Appbar.Header>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Welcome Message */}
        {!selectedLocation && !showMap && (
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../../assets/tour/tour-welcome.jpg')}
              style={styles.welcomeImage}
              resizeMode="cover"
            />
            <View style={styles.welcomeContent}>
              <Text style={[styles.welcomeTitle, { color: theme.colors.text, fontFamily: theme.typography.headingFontFamily }]}>
                {t('tour.welcome.title')}
              </Text>
              <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
                {t('tour.welcome.text')}
              </Text>
              <Button
                mode="contained"
                style={{ backgroundColor: theme.colors.primary }}
                onPress={handleShowMap}
              >
                {t('tour.startTour')}
              </Button>
            </View>
            
            {/* Featured Locations */}
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.headingFontFamily }]}>
              {t('tour.featuredLocations')}
            </Text>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.locationsScroll}
            >
              {tourLocations.map(location => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.locationCard}
                  onPress={() => handleLocationSelect(location)}
                >
                  <Image
                    source={location.image}
                    style={styles.locationImage}
                    resizeMode="cover"
                  />
                  <View style={[styles.locationNameContainer, { backgroundColor: theme.colors.primary + 'CC' }]}>
                    <Text style={styles.locationName}>
                      {location.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Map View */}
        {showMap && (
          <View style={styles.mapContainer}>
            <Surface style={styles.mapSurface}>
              <Image
                source={require('../../assets/tour/castle-map.jpg')}
                style={styles.mapImage}
                resizeMode="contain"
              />
              
              {/* Map Hotspots */}
              {tourLocations.map(location => (
                <TouchableOpacity
                  key={location.id}
                  style={[
                    styles.mapHotspot,
                    { 
                      left: location.position.x, 
                      top: location.position.y,
                      backgroundColor: theme.colors.primary
                    }
                  ]}
                  onPress={() => handleLocationSelect(location)}
                >
                  <Text style={styles.hotspotText}>{location.id.charAt(0).toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </Surface>
            
            <Text style={[styles.mapInstructions, { color: theme.colors.secondary }]}>
              {t('tour.mapInstructions')}
            </Text>
          </View>
        )}
        
        {/* Location Details */}
        {selectedLocation && (
          <Animated.View 
            style={[
              styles.detailsContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseDetails}
            >
              <Ionicons name="close-circle" size={32} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <Image
              source={selectedLocation.image}
              style={styles.detailsImage}
              resizeMode="cover"
            />
            
            <View style={styles.detailsContent}>
              <Text style={[styles.detailsTitle, { color: theme.colors.text, fontFamily: theme.typography.headingFontFamily }]}>
                {selectedLocation.name}
              </Text>
              <Text style={[styles.detailsDescription, { color: theme.colors.text }]}>
                {selectedLocation.description}
              </Text>
              
              <View style={styles.actionsContainer}>
                <Button
                  mode="contained"
                  icon="camera"
                  style={[styles.arButton, { backgroundColor: theme.colors.accent }]}
                  labelStyle={{ color: '#000' }}
                  onPress={handleStartAR}
                >
                  {t('tour.startAR')}
                </Button>
                
                <Button
                  mode="outlined"
                  icon="information-outline"
                  style={[styles.infoButton, { borderColor: theme.colors.primary }]}
                  labelStyle={{ color: theme.colors.primary }}
                  onPress={() => navigation.navigate('TourDetail', { id: selectedLocation.id })}
                >
                  {t('common.more')}
                </Button>
              </View>
              
              <View style={styles.navigationButtons}>
                <Button
                  mode="text"
                  icon="arrow-left"
                  onPress={() => {
                    const currentIndex = tourLocations.findIndex(loc => loc.id === selectedLocation.id);
                    const prevIndex = (currentIndex - 1 + tourLocations.length) % tourLocations.length;
                    setSelectedLocation(tourLocations[prevIndex]);
                  }}
                  style={styles.navButton}
                  labelStyle={{ color: theme.colors.primary }}
                >
                  {t('tour.navigation.previous')}
                </Button>
                
                <Button
                  mode="text"
                  icon="arrow-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  onPress={() => {
                    const currentIndex = tourLocations.findIndex(loc => loc.id === selectedLocation.id);
                    const nextIndex = (currentIndex + 1) % tourLocations.length;
                    setSelectedLocation(tourLocations[nextIndex]);
                  }}
                  style={styles.navButton}
                  labelStyle={{ color: theme.colors.primary }}
                >
                  {t('tour.navigation.next')}
                </Button>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
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
  content: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    padding: 16,
  },
  welcomeImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  welcomeContent: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  locationsScroll: {
    paddingBottom: 16,
  },
  locationCard: {
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  locationImage: {
    width: '100%',
    height: '100%',
  },
  locationNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  locationName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSurface: {
    width: '100%',
    height: '80%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapHotspot: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  hotspotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapInstructions: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  detailsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  detailsImage: {
    width: '100%',
    height: '40%',
  },
  detailsContent: {
    padding: 20,
    flex: 1,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailsDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  arButton: {
    flex: 1,
    marginRight: 8,
  },
  infoButton: {
    flex: 1,
    marginLeft: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  navButton: {
    flex: 1,
  },
});

export default TourScreen;