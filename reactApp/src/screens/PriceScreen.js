/*
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import PriceList from '../components/PriceList'
import { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import SwitchSelector from 'react-native-switch-selector';
Geocoder.init('AIzaSyBIV79qlfKN64XfXLYM4AMzXs9rMKsDobg');
//import RNPickerSelect from 'react-native-picker-select';
//import { Dropdown } from 'react-native-picker-select';
//import DropDownPicker from 'react-native-dropdown-picker';
//RecommendScreen에서 버튼을 누른 후 넘어오는 화면

const PriceScreen = () => {

  const [selectedLocation, setSelectedLocation] = useState({"latitude": 37.545980072390634, "longitude": 126.96479755116412});
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log(selectedLocation);
  };

  const handleAddress = () => {
    navigation.navigate('MapScreen2', {
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
    setCafeData([]);
    setOrderSelect('선택안함');
    setSpaceSelect('선택안함');
  }, [selectedLocation, address]);

  const handleDistance = (x, y) => {
    const haversine = require('haversine')

    const start = {
      latitude : selectedLocation.latitude,
      longitude : selectedLocation.longitude
    }
    const end = {
      latitude : x,
      longitude : y,
    };

    const distance = haversine(start, end, {unit : 'meter'});

    return Math.round(distance);
  }

  let AmeList = [];
  AmeList = fetchAmericano();
  let LatteList = [];
  LatteList = fetchLatte();

  async function fetchAmericano(){
    const response1 = await fetch(`http://localhost:3000/americano`);
    if (response1.ok) {
      console.log('Button States sent successfully!');
      AmeList = await response1.json();
      for (let i=0; i<AmeList.length; i++){
        AmeList[i].distance = handleDistance(AmeList[i].lat, AmeList[i].lng);
        AmeList[i].coffee = AmeList[i].americano;
      }
    } else {
      console.warn('서버 응답에 실패했습니다.');
    }
    return AmeList;
  }

  async function fetchLatte(){
    const response2 = await fetch(`http://localhost:3000/latte`);
    if (response2.ok) {
      console.log('Button States sent successfully!');
      LatteList = await response2.json();
      for (let i=0; i<LatteList.length; i++){
        LatteList[i].distance = handleDistance(LatteList[i].lat, LatteList[i].lng);
        LatteList[i].coffee = LatteList[i].latte;
      }
    } else {
      console.warn('서버 응답에 실패했습니다.');
    }
    return LatteList;
  }

  const options = [
    { label: '아메리카노', value: 0 },
    { label: '카페라떼', value: 1 },
  ];

  const [cafeData, setCafeData] = useState([]);

  const [menuSelect, setMenuSelect] = useState('아메');

  const order = ['선택안함', '가까운순', '낮은가격순'];
  const [orderSelect, setOrderSelect] = useState('선택안함');

  const space = ['선택안함', '500m', '1000m'];
  const [spaceSelect, setSpaceSelect] = useState('선택안함');

  useEffect(() => {
    if (spaceSelect === '500m') {
      setOrderSelect('선택안함');
    } else if (spaceSelect === '1000m') {
      setOrderSelect('선택안함');
    } else if (spaceSelect === '선택안함') {
      setOrderSelect('선택안함');
    }
  }, [spaceSelect]);

  const handleValueChange = (value) => {
    if (value === 0) {
      setCafeData(AmeList);
      setMenuSelect('아메');
      setOrderSelect('선택안함');
      setSpaceSelect('선택안함');
    } else if (value === 1) {
      setCafeData(LatteList);
      setMenuSelect('라떼');
      setOrderSelect('선택안함');
      setSpaceSelect('선택안함');
    }
  };

  const onCafeClick = (item) => {
    navigation.navigate('CafeScreen', { cafe: item });
  };

  const handleDropdownSelect = (option) => {
    setOrderSelect(option);
    if (option === '낮은가격순'){
      let please = [];
      please = cafeData.sort((a,b) => a.coffee - b.coffee);
      setCafeData(please);
    } else if (option === '가까운순'){
      let please = [];
      please = cafeData.sort((a,b) => a.distance - b.distance);
      setCafeData(please);
    } else if (option === '선택안함'){
      let please = [];
      please = cafeData;
      setCafeData(please);
    }
  };

  const handleSpaceSelect = (option) => {
    setSpaceSelect(option);
    if (option === '500m'){
      let please = [];
      if (menuSelect == '아메'){
        please = AmeList.filter((cafe) => cafe.distance <= 500);
      } else if (menuSelect == '라떼') {
        please = LatteList.filter((cafe) => cafe.distance <= 500);
      }
      setCafeData(please);
    } else if (option === '1000m'){
      let please = [];
      if (menuSelect == '아메'){
        please = AmeList.filter((cafe) => cafe.distance <= 1000);
      } else if (menuSelect == '라떼') {
        please = LatteList.filter((cafe) => cafe.distance <= 1000);
      }
      setCafeData(please);
    } else if (option === '선택안함'){
      let please = [];
      if (menuSelect == '아메'){
        please = AmeList;
      } else if (menuSelect == '라떼') {
        please = LatteList;
      }
      setCafeData(please);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.address_content}>
        <TouchableOpacity style={styles.touch_content} onPress={handleAddress}>
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
      <SafeAreaView style={styles.switchContainer}>
        <SwitchSelector
          options={options}
          buttonColor="#FF9F04"
          borderColor="#FF9F04"
          backgroundColor="#DCDCDC"
          initial={0}
          onPress={handleValueChange}
        />
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: 'row', marginBottom: 10 }}>
      <SelectDropdown
          data={space}
          defaultValue={spaceSelect}
          onFocus={handleSpaceSelect}
          dropdownStyle={{ backgroundColor: 'white' }}
          buttonStyle={{
            backgroundColor: 'white',
            width: 125,
            marginTop: 13,
            marginRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#FF9F09',
          }}
          //rowStyle={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}
          onSelect={handleSpaceSelect}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          renderDropdownIcon={() => (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="black"
            />
          )}
        />
        <SelectDropdown
          data={order}
          defaultValue= {orderSelect}
          dropdownStyle={{ backgroundColor: 'white' }}
          buttonStyle={{
            backgroundColor: 'white',
            width: 145,
            marginTop: 13,
            marginRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#FF9F09',
          }}
          onFocus={handleDropdownSelect}
          onSelect={handleDropdownSelect}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          renderDropdownIcon={() => (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="black"
            />
          )}
          rowTextForSelection={(item) => {
            return item;
          }}
        />
      </SafeAreaView>

      <FlatList
        data={cafeData}
        //extraData={this.cafeData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onCafeClick(item)}>
            <PriceList item={[item]} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, datacid) => datacid.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  address_content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },
  touch_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loca_icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 700,
  },
  switchContainer: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  purpose_content: {
    margin: 5,
    marginLeft: 20,
  },
  selects: {},
  scrollcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  scrollbutton: {
    paddingHorizontal: 16,
    marginHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    flexWrap: 'wrap',
    height: 20,
  },
  selectedButton: {
    backgroundColor: '#FF9F09',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PriceScreen;

*/



import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import PriceList from '../components/PriceList'
import { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import SwitchSelector from 'react-native-switch-selector';
Geocoder.init('AIzaSyCj_-ZtMcVeetbHND40KdQ21eLCTgmr51Q');
//import RNPickerSelect from 'react-native-picker-select';
//import {Dropdown} from 'react-native-picker-select';
//import DropDownPicker from 'react-native-dropdown-picker';
//RecommendScreen에서 버튼을 누른 후 넘어오는 화면

const PriceScreen = () => {

  const [selectedLocation, setSelectedLocation] = useState({ "latitude": 37.545980072390634, "longitude": 126.96479755116412 });
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log(selectedLocation);
  };

  const handleAddress = () => {
    navigation.navigate('MapScreen2', {
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
    setCafeData([]);
    setMenuSelect('아메');
    setOrderSelect('선택안함');
    setSpaceSelect('전체');
  }, [selectedLocation, address]);

  const handleDistance = (x, y) => {
    const haversine = require('haversine')

    const start = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude
    }
    const end = {
      latitude: x,
      longitude: y,
    };

    const distance = haversine(start, end, { unit: 'meter' });

    return Math.round(distance);
  }

  /* ------------------------------------------------------------------------ */

  let AmeList = [];
  AmeList = fetchAmericano();
  let LatteList = [];
  LatteList = fetchLatte();

  async function fetchAmericano() {
    const response1 = await fetch(`http://localhost:3000/americano`);
    if (response1.ok) {
      console.log('Button States sent successfully!');
      AmeList = await response1.json();
      for (let i = 0; i < AmeList.length; i++) {
        AmeList[i].distance = handleDistance(AmeList[i].lat, AmeList[i].lng);
        AmeList[i].coffee = AmeList[i].americano;
      }
    } else {
      console.warn('서버 응답에 실패했습니다.');
    }
    return AmeList;
  }

  async function fetchLatte() {
    const response2 = await fetch(`http://localhost:3000/latte`);
    if (response2.ok) {
      console.log('Button States sent successfully!');
      LatteList = await response2.json();
      for (let i = 0; i < LatteList.length; i++) {
        LatteList[i].distance = handleDistance(LatteList[i].lat, LatteList[i].lng);
        LatteList[i].coffee = LatteList[i].latte;
      }
    } else {
      console.warn('서버 응답에 실패했습니다.');
    }
    return LatteList;
  }

  const options = [
    { label: '아메리카노', value: '0' },
    { label: '카페라떼', value: '1' },
  ];

  const [cafeData, setCafeData] = useState([]);

  const [menuSelect, setMenuSelect] = useState('');

  const order = ['선택안함', '가까운순', '낮은가격순'];
  const [orderSelect, setOrderSelect] = useState('선택안함');

  const space = ['전체', '500m', '1000m'];
  const [spaceSelect, setSpaceSelect] = useState('전체');

  // useEffect(() => {
  //   if (spaceSelect === '500m') {
  //     setOrderSelect('선택안함');
  //   } else if (spaceSelect === '1000m') {
  //     setOrderSelect('선택안함');
  //   } else if (spaceSelect === '선택안함') {
  //     setOrderSelect('선택안함');
  //   }
  // }, [spaceSelect]);

  const handleValueChange = (value) => {
    if (value === '0') {
      setCafeData(AmeList);
      setMenuSelect('아메');
      // setOrderSelect('선택안함');
      // setSpaceSelect('선택안함');

      /// ~~~  🍭
      const dropFilter = (hope) => {

        console.log("선택: ", orderSelect)
        if (orderSelect === '낮은가격순') {
          let please2 = [];
          please2 = hope.sort((a, b) => a.coffee - b.coffee);
          setCafeData(please2);
        } else if (orderSelect === '가까운순') {
          let please2 = [];
          please2 = hope.sort((a, b) => a.distance - b.distance);
          setCafeData(please2);
        } else if (orderSelect === '선택안함') {
          let please2 = [];
          please2 = hope;
          setCafeData(please2);
        }
      }

      if (spaceSelect === '500m') {
        console.log('반경: ', spaceSelect)
        let please = [];
        please = AmeList.filter((cafe) => cafe.distance <= 500);
        dropFilter(please);
      }
      // setCafeData(please); // 이거 주석 안했는데 왜 됐지?
      else if (spaceSelect === '1000m') {
        console.log('반경: ', spaceSelect)
        let please = [];
        please = AmeList.filter((cafe) => cafe.distance <= 1000);
        dropFilter(please);
      }
      // setCafeData(please);
      else if (spaceSelect === '전체') {
        let please = [];
        please = AmeList;
        dropFilter(please);
        // setCafeData(please);
      }
      // ~~~

    } else if (value === '1') {
      setCafeData(LatteList);
      setMenuSelect('라떼');
      // setOrderSelect('선택안함');
      // setSpaceSelect('선택안함');



      /// ~~~  🍭
      const dropFilter = (hope) => {

        console.log("선택: ", orderSelect)
        if (orderSelect === '낮은가격순') {
          let please2 = [];
          please2 = hope.sort((a, b) => a.coffee - b.coffee);
          setCafeData(please2);
        } else if (orderSelect === '가까운순') {
          let please2 = [];
          please2 = hope.sort((a, b) => a.distance - b.distance);
          setCafeData(please2);
        } else if (orderSelect === '선택안함') {
          let please2 = [];
          please2 = hope;
          setCafeData(please2);
        }
      }

      if (spaceSelect === '500m') {
        console.log('반경: ', spaceSelect)
        let please = [];
        please = LatteList.filter((cafe) => cafe.distance <= 500);
        dropFilter(please);
      }
      // setCafeData(please); // 이거 주석 안했는데 왜 됐지?
      else if (spaceSelect === '1000m') {
        console.log('반경: ', spaceSelect)
        let please = [];
        please = LatteList.filter((cafe) => cafe.distance <= 1000);
        dropFilter(please);
      }
      // setCafeData(please);
      else if (spaceSelect === '전체') {
        let please = [];

        please = LatteList;
        dropFilter(please);
        // setCafeData(please);
      }

      // ~~~

    }
  };

  const onCafeClick = (item) => {
    navigation.navigate('CafeScreen', { cafe: item });
  };

  const handleDropdownSelect = (option) => {
    console.log("이거: ", option)
    setOrderSelect(option);
    if (option === '낮은가격순') {
      let please = [];
      please = cafeData.sort((a, b) => a.coffee - b.coffee);
      setCafeData(please);
    } else if (option === '가까운순') {
      let please = [];
      please = cafeData.sort((a, b) => a.distance - b.distance);
      setCafeData(please);
    } else if (option === '선택안함') {
      let please = [];
      please = cafeData;
      setCafeData(please);
    }
  };


  const handleSpaceSelect = (option) => {
    const dropFilter = (hope) => {

      console.log("선택: ", orderSelect)
      if (orderSelect === '낮은가격순') {
        let please2 = [];
        please2 = hope.sort((a, b) => a.coffee - b.coffee);
        setCafeData(please2);
      } else if (orderSelect === '가까운순') {
        let please2 = [];
        please2 = hope.sort((a, b) => a.distance - b.distance);
        setCafeData(please2);
      } else if (orderSelect === '선택안함') {
        let please2 = [];
        please2 = hope;
        setCafeData(please2);
      }
    }
    setSpaceSelect(option);
    if (option === '500m') {
      console.log('반경: ', option)
      let please = [];
      if (menuSelect == '아메') {
        please = AmeList.filter((cafe) => cafe.distance <= 500);
        dropFilter(please);
      } else if (menuSelect == '라떼') {
        please = LatteList.filter((cafe) => cafe.distance <= 500);
        dropFilter(please);
      }
      // setCafeData(please); // 이거 주석 안했는데 왜 됐지?
    } else if (option === '1000m') {
      console.log('반경: ', option)
      let please = [];
      if (menuSelect == '아메') {
        please = AmeList.filter((cafe) => cafe.distance <= 1000);
        dropFilter(please);

      } else if (menuSelect == '라떼') {
        please = LatteList.filter((cafe) => cafe.distance <= 1000);
        dropFilter(please);
      }
      // setCafeData(please);
    } else if (option === '전체') {
      let please = [];
      if (menuSelect == '아메') {
        please = AmeList;
        dropFilter(please);
      } else if (menuSelect == '라떼') {
        please = LatteList;
        dropFilter(please);
      }
      // setCafeData(please);
    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.address_content}>
        <TouchableOpacity style={styles.touch_content} onPress={handleAddress}>
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
      <SafeAreaView style={styles.switchContainer}>
        <SwitchSelector
          options={options}
          buttonColor="#FF9F04"
          borderColor="#FF9F04"
          backgroundColor="#DCDCDC"
          initial={'0'}
          onPress={handleValueChange}
        />
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: 'row', marginBottom: 10 }}>

        <SelectDropdown
          data={space}
          defaultValue={spaceSelect}

          dropdownStyle={{ backgroundColor: 'white' }}
          buttonStyle={{
            backgroundColor: 'white',
            width: 125,
            marginTop: 13,
            marginRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#FF9F09',
          }}
          //rowStyle={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}
          onFocus={handleSpaceSelect}
          onSelect={handleSpaceSelect}


          renderDropdownIcon={() => (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="black"
            />
          )}
        />
        <SelectDropdown
          data={order}
          defaultValue={orderSelect}
          dropdownStyle={{ backgroundColor: 'white' }}
          buttonStyle={{
            backgroundColor: 'white',
            width: 145,
            marginTop: 13,
            marginRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#FF9F09',
          }}
          onFocus={handleDropdownSelect}
          onSelect={handleDropdownSelect}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          renderDropdownIcon={() => (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="black"
            />
          )}
          rowTextForSelection={(item) => {
            return item;
          }}
        />
      </SafeAreaView>

      <FlatList
        data={cafeData}
        //extraData={this.cafeData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onCafeClick(item)}>
            <PriceList item={[item]} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, datacid) => datacid.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  address_content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },
  touch_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loca_icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 700,
  },
  switchContainer: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  purpose_content: {
    margin: 5,
    marginLeft: 20,
  },
  selects: {},
  scrollcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  scrollbutton: {
    paddingHorizontal: 16,
    marginHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    flexWrap: 'wrap',
    height: 20,
  },
  selectedButton: {
    backgroundColor: '#FF9F09',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PriceScreen;