import { AppRegistry } from 'react-native';
import App from './App';
// check this later
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('FoodFactory', () => App);
