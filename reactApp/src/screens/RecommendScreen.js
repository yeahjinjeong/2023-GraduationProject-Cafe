import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
//import MapScreen from './MapScreen';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyCj_-ZtMcVeetbHND40KdQ21eLCTgmr51Q');

const RecommendScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState({"latitude": 37.545980072390634, "longitude": 126.96479755116412});
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log(selectedLocation);
  };

  const handleAddress = () => {
    navigation.navigate('MapScreen', {
      onLocationSelected: handleLocationSelected,
      navigation: navigation,
    });
  };

  useEffect(() => {
    const getAddressFromCoordinates = async () => {
      try {
        const response = await Geocoder.from(
          selectedLocation.latitude,
          selectedLocation.longitude
        );
        if (response.results.length > 0) {
          setAddress(response.results[0].formatted_address);
        }
      } catch (error) {
        console.error(error);
      }
      console.log(address);
    };

    getAddressFromCoordinates();
  }, [selectedLocation, address]);

  const onSubmit = async () => {
    if (!firstSelect || !secondSelect) {
      Alert.alert('알림', '목적을 선택해주세요.');
      return;
    }
    if (!selectedLocation) {
      Alert.alert('알림', '위치를 선택해주세요');
      return;
    }
    /*
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstSelect: firstSelect,
          secondSelect: secondSelect,
          addressSelect: addressSelect,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('서버 응답에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
*/
    navigation.navigate('RecommendScreen2', {
      firstSelect: firstSelect,
      secondSelect: secondSelect,
      selectedLocation: selectedLocation,
      address: address,
    });

    //console.log(firstSelect);
    //console.log(secondSelect);
    //console.log(addressSelect);
  };

  const [firstSelect, setFirstSelect] = useState('');
  const [secondSelect, setSecondSelect] = useState('');
  //const [addressSelect, setAddressSelect] = useState('청파로 47길 100');

  const handleFirstPickerChange = (itemValue) => {
    setFirstSelect(itemValue);
    setSecondSelect('');
  };

  const handleSecondPickerChange = (itemValue) => {
    setSecondSelect(itemValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <SafeAreaView style={styles.address_content}>
          <TouchableOpacity
            style={styles.touch_content}
            onPress={handleAddress}
          >
            <MaterialIcons
              style={styles.loca_icon}
              name="location-on"
              size={40}
            />
            <Text style={styles.address}>
              {selectedLocation ? `위치: ${address}` : '위치 설정하기'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <Text style={styles.text}>카페를 방문하는 목적을 선택해주세요.</Text>
        <SafeAreaView style={styles.picker_content}>
          <Picker
            style={styles.picker}
            selectedValue={firstSelect}
            onValueChange={handleFirstPickerChange}
          >
            <Picker.Item label="식도락" value="식도락" />
            <Picker.Item label="공부•업무" value="공부•업무" />
            <Picker.Item label="친목" value="친목" />
            <Picker.Item label="여가" value="여가" />
          </Picker>
        </SafeAreaView>
        {firstSelect === '식도락' && (
          <SafeAreaView>
            <Picker
              style={styles.picker}
              selectedValue={secondSelect}
              onValueChange={handleSecondPickerChange}
            >
              <Picker.Item label="브런치, 식사" value="brunch" />
              <Picker.Item label="커피" value="coffee" />
              <Picker.Item label="차" value="tea" />
              <Picker.Item label="디저트" value="dessert" />
              <Picker.Item label="비건" value="vegan" />
            </Picker>
          </SafeAreaView>
        )}
        {firstSelect === '공부•업무' && (
          <SafeAreaView>
            <Picker
              style={styles.picker}
              selectedValue={secondSelect}
              onValueChange={handleSecondPickerChange}
            >
              <Picker.Item label="(1인) 공부, 작업, 업무" value="study" />
              <Picker.Item label="(다수) 팀플, 회의, 스터디" value="team" />
            </Picker>
          </SafeAreaView>
        )}
        {firstSelect === '친목' && (
          <SafeAreaView>
            <Picker
              style={styles.picker}
              selectedValue={secondSelect}
              onValueChange={handleSecondPickerChange}
            >
              <Picker.Item label="대모임" value="large" />
              <Picker.Item label="대화, 수다" value="chat" />
              <Picker.Item label="아이" value="child" />
              <Picker.Item label="할머니, 할아버지" value="senior" />
              <Picker.Item label="파티" value="party" />
            </Picker>
          </SafeAreaView>
        )}
        {firstSelect === '여가' && (
          <SafeAreaView>
            <Picker
              style={styles.picker}
              selectedValue={secondSelect}
              onValueChange={handleSecondPickerChange}
            >
              <Picker.Item label="휴식" value="rest" />
              <Picker.Item label="sns, 핫플" value="sns" />
              <Picker.Item label="테마" value="theme" />
            </Picker>
          </SafeAreaView>
        )}
        <SafeAreaView style={styles.btn_content}>
          <TouchableOpacity style={styles.searchbtn} onPress={onSubmit}>
            <Text style={{ fontSize: 24, fontWeight: 700 }}>
              원하는 카페 찾기
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },

  address_content: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touch_content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loca_icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 700,
    flexShrink: 1,
  },
  text: {
    marginTop: 20,
    marginLeft: 40,
    fontSize: 20,
    fontWeight: 700,
  },
  picker: {
    marginBottom: 0,
    fontSize: 15,
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

RecommendScreen.propTypes = {
  navigation: PropTypes.object,
};

export default RecommendScreen;