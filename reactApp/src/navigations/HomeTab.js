import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderLeftButton from '../components/HeaderLeftButton';
import CafeScreen from '../screens/CafeScreen';
import ContentTab from './ContentTab';
import ReviewScreen from '../screens/ReviewScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
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
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: '카페 검색' }}
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
      <Stack.Screen name="ContentTab" component={ContentTab} />
    </Stack.Navigator>
  );
};

export default HomeTab;