import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const MapScreen = ({ route, navigation }) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    console.log(coordinate);
  };

  const handleLocationSelection = () => {
    if (selectedLocation) {
      const { onLocationSelected } = route.params;
      onLocationSelected(selectedLocation);
      navigation.goBack();
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});

        const { latitude, longitude } = coords;

        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={handleMapPress}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      <SafeAreaView style={styles.btn_content}>
        <TouchableOpacity
          style={styles.searchbtn}
          onPress={handleLocationSelection}
        >
          <Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center' }}>
            위치 설정 완료
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  map: {
    height: 400,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginBottom: 20,
  },
  btn_content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbtn: {
    backgroundColor: '#FF9F04',
    width: 180,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});

export default MapScreen;