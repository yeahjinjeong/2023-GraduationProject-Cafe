import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import Input, { KeyBoardTypes, ReturnKeyTypes } from '../components/Input';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  //   const [ErrorText, setErrortext] = useState('');

  const handleSubmitPress = async (id, pw) => {
    if (!id) {
      Alert.alert('아이디를 입력해주세요');
      return;
    }
    if (!pw) {
      Alert.alert('비밀번호를 입력해주세요');
      return;
    }
    let dataToSend = { userid: id, userpw: pw };
    try {
      console.log(dataToSend);
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        console.log('전송 성공');
        console.log('datatoSend: ', dataToSend);
        const isSuccess = await response.json();
        console.log('response : ', isSuccess);
        // console.log('Login Info sent successfully!');
        //console.log(updatedButtonList, secondSelect);
        //const jsonResponse = await response.json();
        //console.log(jsonResponse);
        const alterMessages = isSuccess.isLogin;
        console.log(alterMessages);
        if (alterMessages == 'True') {
          Alert.alert('로그인을 성공했습니다');
          // navigation.navigate('ProfileScreen');
        } else {
          Alert.alert('알림', alterMessages);
          return;
        }
      } else {
        console.warn('서버 응답에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
    navigation.goBack();
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <SafeAreaView style={styles.loginContainer}>
        <TextInput
          style={styles.inputTop}
          placeholder="아이디"
          onChangeText={(id) => setId(id)}
        />
        <TextInput
          style={[styles.input]}
          placeholder="비밀번호"
          secureTextEntry={true}
          textContentType={'oneTimeCode'}
          onChangeText={(pw) => setPw(pw)}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmitPress(id, pw)}
          >
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    margin: 20,
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center',
  },
  loginContainer: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  inputTop: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9F04',
    marginTop: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
});

export default LoginScreen;