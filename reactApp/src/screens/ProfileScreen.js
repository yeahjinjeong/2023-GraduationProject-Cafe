import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
//import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
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
        } else {
          console.log('false!');
          setIsLogin(false);
        }
      });
  }

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleLogout = () => {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('logout success');
        setIsLogin(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReview = () => {
    if (isLogin == false) {
      Alert.alert('로그인 후 이용할 수 있습니다');
      return;
    }
    navigation.navigate('MyReview');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLogin ? (
        <SafeAreaView style={styles.logContainer}>
          <Text style={styles.nickname}>{nickname} 님, 안녕하세요!</Text>
          <TouchableOpacity style={styles.outButton} onPress={handleLogout}>
            <Text style={styles.outBtnText}>로그아웃</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.logContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <SafeAreaView style={styles.line} />
      <SafeAreaView style={styles.reviewContainer}>
        <TouchableOpacity style={styles.reviewbtn} onPress={handleReview}>
          <Text style={styles.review}>내가 쓴 리뷰</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.line2}></SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  logContainer: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    margin: 20,
    borderRadius: 5,
  },

  nickname: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 600,
  },
  outButton: {
    backgroundColor: '#FF9F04',
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
  outBtnText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 700,
  },
  button: {
    backgroundColor: '#FF9F04',
    margin: 10,
    borderRadius: 5,
    padding: 15,
  },
  btnText: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 700,
  },
  line: {
    borderWidth: 3,
    borderColor: '#BFBDC0',
    width: '100%',
    marginTop: 10,
  },
  reviewContainer: {
    margin: 10,
  },
  reviewbtn: {
    margin: 10,
  },
  review: {
    fontSize: 18,
    fontWeight: 700,
  },
  line2: {
    borderWidth: 1,
    borderColor: '#BFBDC0',
  },
});

export default ProfileScreen;
