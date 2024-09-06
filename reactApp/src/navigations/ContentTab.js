import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecommStack from './RecommStack';
//import RecommendScreen from '../screens/RecommendScreen';
import LoginStack from './LoginStack';
// import PriceScreen from '../screens/PriceScreen';
import PriceTab from './PriceTab';
import HomeScreen from '../screens/HomeScreen';
import HomeTab from './HomeTab';
import LikeScreen from '../screens/LikeScreen';
import LikeTab from './LikeTab';
import ProfileScreen from '../screens/ProfileScreen';
import { ContentRoutes } from './routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const getTabBarIcon = ({ focused, color, size, name }) => {
  const iconName = focused ? name : `${name}`;
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

const ContentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ContentRoutes.RECOMMEND}
        component={RecommStack}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'coffee' }),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={ContentRoutes.PRICE}
        component={PriceTab}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'cash' }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ContentRoutes.HOME}
        component={HomeTab}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'home' }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ContentRoutes.LIKE}
        component={LikeTab}
        options={{
          tabBarIcon: (props) =>
            getTabBarIcon({ ...props, name: 'cards-heart' }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ContentRoutes.PROFILE}
        component={LoginStack}
        options={{
          tabBarIcon: (props) =>
            getTabBarIcon({ ...props, name: 'account-circle' }),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default ContentTab;
