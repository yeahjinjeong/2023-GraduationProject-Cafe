import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderLeftButton from '../components/HeaderLeftButton';
import ProfileScreen from '../screens/ProfileScreen';
import MyReview from '../screens/MyReview';
import LoginScreen from '../screens/LoginScreen';
import CafeScreen from '../screens/CafeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ContentTab from './ContentTab';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        contentStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyReview"
        component={MyReview}
        options={{ title: '내가 쓴 리뷰' }}
      />
      <Stack.Screen
        name="CafeScreen"
        component={CafeScreen}
        options={{ title: '카페 상세페이지' }}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{ title: '후기 남기기' }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: '로그인' }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: '회원가입' }}
      />
      <Stack.Screen name="ContentTab" component={ContentTab} />
    </Stack.Navigator>
  );
};

export default LoginStack;