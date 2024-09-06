import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { isFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LikeList from '../components/LikeList';
import { useIsFocused } from '@react-navigation/native';

const LikeScreen = () => {
  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    handleProfile();
  }, [isFocused]);

  function handleProfile() {
    fetch('http://localhost:3000/authcheck')
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === 'True') {
          console.log('true!');
          setIsLogin(true);
          setNickname(json.username);
          fetchLike();
        } else {
          console.log('false!');
          setIsLogin(false);
        }
      });
  }
  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const [likeList, setLikeList] = useState([]);
  const [cafeTemp, setCafeTemp] = useState([]);

  async function fetchLike() {
    try {
      const response = await fetch('http://localhost:3000/like/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: 0 }),
      });
      if (response.ok) {
        getData();
        const LikeRaw = await response.json();
        const heartList = [];
        for (let i=0; i<LikeRaw.length; i++){
          for (let j=0; j<cafeTemp.length; j++){
            if (LikeRaw[i].datacid === cafeTemp[j].datacid){
              heartList.push(cafeTemp[j])
            }
          }
        }
        setLikeList(heartList)
      } else {
        console.log('찜한 카페가 없습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getData = () => {
    fetch('http://localhost:3000/cafe')
      .then((res) => res.json())
      .then((data) => {
        setCafeTemp(data);
      });
  };

  const onCafeClick = (item) => {
    console.log('Like item : ', item.datacid);
    for (let j = 0; j < cafeTemp.length; j++) {
      if (item.datacid == cafeTemp[j].datacid) {
        console.log(cafeTemp[j]);
        const cafeData = cafeTemp[j];
        navigation.navigate('CafeScreen', { cafe: cafeData });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLogin ? (
        <SafeAreaView style={styles.likeContainer}>
          <FlatList
            data={likeList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onCafeClick(item)}>
                <LikeList item={[item]} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.datacid}
            numColumns={2}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.notLoginContainer}>
          <Text style={styles.notLogin}>
            로그인 후 이용할 수 있는 페이지 입니다.
          </Text>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.login}>로그인하러 가기</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  likeContainer: {
    marginTop: 10,
    flex: 1,
  },

  notLoginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notLogin: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 20,
  },

  loginBtn: {
    margin: 15,
    backgroundColor: '#FF9F04',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  login: {
    fontSize: 18,
    fontWeight: 700,
  },
});

export default LikeScreen;
