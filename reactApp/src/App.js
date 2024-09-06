import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
//import AuthStack from './navigations/AuthStack';
import ContentTab from './navigations/ContentTab';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <ContentTab />
    </NavigationContainer>
  );
};

export default App;
