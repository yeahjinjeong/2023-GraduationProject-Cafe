import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderLeftButton from '../components/HeaderLeftButton';
import LikeScreen from '../screens/LikeScreen';

import LoginScreen from '../screens/LoginScreen';
import CafeScreen from '../screens/CafeScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ContentTab from './ContentTab';

const Stack = createNativeStackNavigator();

const LikeTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="LikeScreen"
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
        name="LikeScreen"
        component={LikeScreen}
        options={{ title: '내가 찜함 카페 목록' }}
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
      <Stack.Screen name="ContentTab" component={ContentTab} />
    </Stack.Navigator>
  );
};

export default LikeTab;
