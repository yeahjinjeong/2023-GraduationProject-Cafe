/*
import { useCallback, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
//import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useNavigation, useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {

  const navigation = useNavigation();

  const [search, setSearch] = useState(''); //검색창에 입력하는 단어
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [cafeData, setCafeData] = useState([]);


  useEffect(() => {
    const fetchCafe = async () => {
      const response = await fetch(`http://localhost:3000/cafe`);
      if (response.ok) {
        console.log('Button States sent successfully!');
        const allCafe = await response.json();
        setCafeData(allCafe);
      } else {
        console.warn('서버 응답에 실패했습니다.');
      }
    }
    fetchCafe();
  }, []);

  const handleSearch = () => {
    searchAPI(search);
    navigation.navigate('SearchScreen', { cafe : list , navigation: navigation});
  };

  // const onChangeKeyword = useCallback((text) => {
  //   setSearch(text.trim());
  // }, []);

  // async function fetchCafe(){
  //   const response = await fetch(`http://localhost:3000/cafe`);
  //   if (response.ok) {
  //     console.log('Button States sent successfully!');
  //     const allCafe = await response.json();
  //     setCafeData(allCafe);
  //   } else {
  //     console.warn('서버 응답에 실패했습니다.');
  //   }
  // }

  const searchAPI = (keyword) => {
    let searchlist = [];
    searchlist = cafeData.filter((v) => v.카페명.includes(keyword))
    setList(searchlist)
    console.log(searchlist);
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>궁금한 카페를 검색하세요!</Text>
      <TextInput
        style={styles.textinput}
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text>검색</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
    marginRight: 120,
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#FF9F04',
    borderRadius: 15,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    margin: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

// HomeScreen.propTypes = {
//   navigation: PropTypes.object,
// };

export default HomeScreen;


import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
//import { FontAwesome } from '@expo/vector-icons';


let cafeName = []

const HomeScreen = () => {
  const [searchText, setSearchText] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      // handleSearch();
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchText])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/cafe');
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        var cafeObj = {}
        cafeObj.datacid = data[i]['datacid'];
        cafeObj.name = data[i]['카페명'];
        cafeName.push(cafeObj);
      }
      //console.log("**********")
      // console.log(cafeName)

    } catch (error) {
      console.log(error);
    }
  }

  // console.log(data[0].title);

  const handleSearch = () => {
    const filteredData = [];

    cafeName.map(item => {
      if (item.name.includes(searchText)) {
        filteredData.push(item);
      }
    })
    console.log(filteredData);
    setSearchResults(filteredData);

    navigation.navigate('SearchScreen', { cafe : searchResults , navigation: navigation});
  };
  // console.log(searchResults)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>궁금한 카페를 검색하세요!</Text>
      <TextInput
        style={styles.textinput}
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text>검색</Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.datacid.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      {/* <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        // initialValue={{id: '0'}} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={searchResults}
      /> }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
    marginRight: 120,
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#FF9F04',
    borderRadius: 15,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    margin: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default HomeScreen;
*/

import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
//import RecommendList from '../components/RecommendList';
import SearchList from '../components/SearchList';
import { useNavigation } from '@react-navigation/native';

//import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [cafeList, setCafeList] = useState([]);
  const [cafeName, setCafeName] = useState([]);

  const handleSearch = () => {
    const filteredData = [];

    cafeName.map((item) => {
      if (item.카페명.includes(search)) {
        filteredData.push(item);
      }
    });
    //console.log(filteredData);
    setCafeList(filteredData);
    if (search == '') {
      setCafeList([])
    }
  };

  const getData = () => {
    fetch('http://localhost:3000/cafe')
      .then((res) => res.json())
      .then((data) => {
        setCafeName(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  const onCafeClick = (item) => {
    navigation.navigate('CafeScreen', { cafe: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>궁금한 카페를 검색하세요!</Text>
      <SafeAreaView style={styles.searchContainer}>
        <TextInput
          style={styles.textinput}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text>검색</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.flatContainer}>
        <FlatList
          data={cafeList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onCafeClick(item)}>
              <SearchList item={[item]} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, datacid) => datacid.toString()}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    //marginLeft: 20,
    //justifyContent: 'center',
    //alignItems: 'center',
    //flex: '1',
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
    marginRight: 120,
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#FF9F04',
    borderRadius: 15,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    margin: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  flatContainer: {
    backgroundColor: 'white',
    marginLeft: 10,
  },
});

export default HomeScreen;