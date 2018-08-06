import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Provider as PaperProvider } from "react-native-paper";

import WelcomeScreen from "./Screens/WelcomeScreen";
import SearchScreen from "./Screens/SearchScreen";
import SearchDetailsScreen from "./Screens/SearchDetailsScreen";
import CardDetailsScreen from "./Screens/CardDetailsScreen";

console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          marginTop: StatusBar.currentHeight
        }
      }
    },
    SearchDetails: {
      screen: SearchDetailsScreen,
      navigationOptions: {
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          marginTop: StatusBar.currentHeight
        }
      }
    },
    CardDetails: {
      screen: CardDetailsScreen,
      navigationOptions: {
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          marginTop: StatusBar.currentHeight
        }
      }
    }
  },
  {
    initialRouteName: "Welcome"
  }
);

class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <RootStack />
      </PaperProvider>
    );
  }
}

export default App;
