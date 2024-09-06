import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
//import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

//import axios from 'axios';
//import { bool } from 'prop-types';

const RegisterScreen = () => {
  const navigation = useNavigation();

  //입력상태
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [checked, setChecked] = useState('');
  const handleRadioButtonPress = (value) => {
    setChecked(value === checked ? '' : value);
  };
  const [birth, setBirth] = useState(moment().format('YYYY-MM-DD'));
  const handleDateChange = (event, date) => {
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setBirth(formattedDate);
    }
  };

  //오류메시지 상태저장
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');

  //유효성 검사
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  //닉네임
  const onChangeNickname = (textNickname) => {
    const nicknameRegex = /^[ㄱ-ㅎ가-힣0-9]/;

    setNickname(textNickname);
    if (
      textNickname.length < 2 ||
      textNickname.length > 6 ||
      !nicknameRegex.test(textNickname)
    ) {
      setNicknameMessage(
        '한글과 숫자 조합으로 2글자 이상 6글자 미만으로 입력해주세요.'
      );
      setIsNickname(false);
    } else {
      setNicknameMessage('올바른 형식입니다.');
      setIsNickname(true);
    }
  };

  //이메일
  const onChangeEmail = (textEmail) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(textEmail);
    if (!emailRegex.test(textEmail)) {
      setEmailMessage('이메일 형식이 올바르지 않습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식입니다.');
      setIsEmail(true);
    }
  };

  //아이디
  const onChangeId = (textId) => {
    const idRegex = /^[A-Za-z0-9]{5,7}$/;
    setId(textId);
    if (!idRegex.test(textId)) {
      setIdMessage('영어+숫자 조합으로 5글자 이상 7글자 이하로 입력해주세요');
      setIsId(false);
    } else {
      setIdMessage('올바른 형식입니다.');
      setIsId(true);
    }
  };
  //비밀번호
  const onChangePw = (textPw) => {
    const pwRegex = /^[A-Za-z0-9]{8,12}$/;
    setPw(textPw);
    if (!pwRegex.test(textPw)) {
      setPwMessage('영어+숫자 조합으로 8글자 이상 12글자 이하로 입력해주세요');
      setIsPw(false);
    } else {
      setPwMessage('올바른 형식입니다.');
      setIsPw(true);
    }
  };

  const handleSubmitButton = async () => {
    if (!nickname) {
      Alert.alert('닉네임을 입력해주세요');
      return;
    }
    if (isNickname == false) {
      Alert.alert('닉네임을 확인해주세요');
      return;
    }
    if (!email) {
      Alert.alert('이메일을 입력해주세요');
      return;
    }
    if (isEmail == false) {
      Alert.alert('이메일을 확인해주세요');
      return;
    }
    if (!id) {
      Alert.alert('아이디를 입력해주세요');
      return;
    }
    if (isId == false) {
      Alert.alert('아이디를 확인해주세요');
      return;
    }
    if (!pw) {
      Alert.alert('비밀번호를 입력해주세요');
      return;
    }
    if (isPw == false) {
      Alert.alert('비밀번호를 확인해주세요');
      return;
    }
    if (!pwCheck) {
      Alert.alert('비밀번호 확인을 입력해주세요');
      return;
    }
    if (pw != pwCheck) {
      Alert.alert('비밀번호가 일치한지 확인해주세요');
      return;
    }
    if (!checked) {
      Alert.alert('성별을 선택해주세요');
      return;
    }
    if (!birth) {
      Alert.alert('생년월일을 선택해주세요');
      return;
    }

    const userData = {
      username: nickname,
      id: id,
      pw: pw,
      birth: birth,
      sex: checked,
      email: email,
    };

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log('userData 전송 성공');
        console.log('userData : ', userData);
        const isSuccess = await response.json();
        console.log('response : ', isSuccess);
        const alterMessage = isSuccess.isSuccess;
        if (alterMessage != '저장완료') {
          Alert.alert('알림', alterMessage);
          return;
        } else {
          Alert.alert('회원가입이 완료되었습니다!');
        }
      } else {
        console.log('userData 전송 실패');
        console.log('userData : ', userData);
      }
    } catch (error) {
      console.error(error);
    }

    navigation.goBack();
  };

  return (
    //username, id, pw, birth, sex, email
    <SafeAreaView style={styles.container}>
      {/*<Text style={styles.registerText}>회원가입</Text>*/}
      <ScrollView style={styles.registerContainer}>
        <SafeAreaView style={styles.inputContainer}>
          {/* <Text style={{ margin: 5, fontSize: 15, fontWeight: 700 }}>
            닉네임
          </Text> */}
          <TextInput
            style={styles.input}
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChangeText={onChangeNickname}
          />
          <Text style={styles.message}>{nicknameMessage}</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          {/* <Text style={{ margin: 5, fontSize: 15, fontWeight: 700 }}>
            이메일
          </Text> */}
          <TextInput
            style={styles.input}
            placeholder="이메일 입력해주세요."
            onChangeText={onChangeEmail}
          />
          <Text style={styles.message}>{emailMessage}</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          {/* <Text style={{ margin: 5, fontSize: 15, fontWeight: 700 }}>
            아이디
          </Text> */}
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요."
            onChangeText={onChangeId}
          />
          <Text style={styles.message}>{idMessage}</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          {/* <Text style={{ margin: 5, fontSize: 15, fontWeight: 700 }}>
            비밀번호
          </Text> */}
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry={true}
            textContentType={'oneTimeCode'}
            onChangeText={onChangePw}
          />
          <Text style={styles.message}>{pwMessage}</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.inputContainer}>
          {/* <Text style={{ margin: 5, fontSize: 15, fontWeight: 700 }}>
            비밀번호 확인
          </Text> */}
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            textContentType={'oneTimeCode'}
            onChangeText={(pwCheck) => setPwCheck(pwCheck)}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.radioContainer}>
          {/* <Text style={{ margin: 5, fontSize: 15, fontWeight: 700 }}>
            성별을 선택해주세요.
          </Text> */}
          <SafeAreaView style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                checked === 'male' && styles.radioButtonChecked,
              ]}
              onPress={() => handleRadioButtonPress('male')}
            >
              {checked === 'male' && (
                <SafeAreaView style={styles.radioButtonCheckedInner} />
              )}
            </TouchableOpacity>
            <Text style={styles.radioButtonLabel}>남성</Text>
            <TouchableOpacity
              style={[
                styles.radioButton,
                checked === 'female' && styles.radioButtonChecked,
              ]}
              onPress={() => handleRadioButtonPress('female')}
            >
              {checked === 'female' && (
                <SafeAreaView style={styles.radioButtonCheckedInner} />
              )}
            </TouchableOpacity>
            <Text style={styles.radioButtonLabel}>여성</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.inputContainer}>
          {/* <Text style={{ margin: 5, fontSize: 15, fontWeight: 700 }}>
            생년월일을 입력해주세요.
          </Text> */}
          <DateTimePicker
            style={{ backgroundColor: 'white' }}
            dateFormat="YYYY-MM-DD"
            onChange={handleDateChange}
            mode="date"
            display="spinner"
            value={moment(birth, 'YYYY-MM-DD').toDate()}
            //format="YYYY-MM-DD"
            minimumDate={new Date(1950, 1, 1)}
            maximumDate={new Date(2023, 12, 31)}
            //useNativeDriver={false}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
          />
        </SafeAreaView>
        <TouchableOpacity style={styles.button} onPress={handleSubmitButton}>
          <Text style={styles.buttonText}>가입하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  registerText: {
    margin: 20,
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center',
  },
  registerContainer: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 16,
  },
  inputContainer: {
    //borderBottomWidth: 2,
    //borderColor: '#FCD34D',
    marginBottom: 10,
    //backgroundColor: '#FDE68a',
  },
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    marginBottom: 5,
    margin: 5,
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
  radioContainer: {
    width: '100%',
    //borderBottomWidth: 2,
    borderRadius: 4,
    borderColor: '#FCD34D',
    marginBottom: 10,
    paddingVertical: 8,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 8,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonChecked: {
    backgroundColor: 'black',
  },
  radioButtonCheckedInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  radioButtonLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },

  message: {
    color: 'blue',
    marginBottom: 15,
    marginLeft: 5,
    fontWeight: 700,
  },
});

export default RegisterScreen;
