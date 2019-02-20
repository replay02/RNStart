
import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Main from './Main';
import HereWeather from './HereWeather';
import WeatherList from './WeatherList';
import ImageGrid from './ImageGrid';
import MapScene from './MapScene';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

// const AppNavigator = createStackNavigator({
//   Home : Main,
//   HereWeather: HereWeather
// });



const HomeStack = createStackNavigator({
  Home: Main,
  HereWeather: HereWeather,
  ImageGrid: ImageGrid,
},
  {
    initialRouteName: 'Home',

    /* 네비게이션 헤더 옵션 */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

const SettingsStack = createStackNavigator({
  WeatherList: WeatherList,
  Map: MapScene,
},{
  initialRouteName: 'WeatherList',

  /* 네비게이션 헤더 옵션 */
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#418cff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const TabNavigator = createBottomTabNavigator({
  Main: {
    screen: HomeStack,
    navigationOptions: {
    
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `weather${focused ? '-sunny' : '-partlycloudy'}`;
        // return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
        return <MaterialCommunityIcons name={iconName} size={25} color={focused?'#418cff' : '#888'} />;
        
      }
    }
  },
  Settings: { 
    screen: SettingsStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        // const iconName = `weather-partlycloudy${focused ? '' : '-outline'}`;

        const iconName = 'ios-alert';
        return <Ionicons name={iconName} size={25} color={focused?'#418cff' : '#888'} />;
      }
    }
  }
}, 
{
    tabBarOptions: {
      showIcon: true,
      showLabel :false,
      style: {
        elevation: 10,
        marginBottom: 5
      },
      activeTintColor: 'black',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#efefef',
      },
    }
  }
);


const App = createAppContainer(TabNavigator);

export default App;