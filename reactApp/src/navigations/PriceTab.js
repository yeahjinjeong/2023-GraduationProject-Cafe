import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderLeftButton from '../components/HeaderLeftButton';
import PriceScreen from '../screens/PriceScreen';
import MapScreen2 from '../screens/MapScreen2';
import CafeScreen from '../screens/CafeScreen';
import ContentTab from './ContentTab';
import ReviewScreen from '../screens/ReviewScreen';

const Stack = createNativeStackNavigator();

const PriceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PriceScreen"
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
        name="PriceScreen"
        component={PriceScreen}
        options={{ title: '가격비교 페이지' }}
        />
        <Stack.Screen
            name="MapScreen2"
            component={MapScreen2}
            options={{ title: '주소 설정' }}
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

export default PriceStack;