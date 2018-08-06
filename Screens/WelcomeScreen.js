import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Dimensions,
  StatusBar
} from "react-native";

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  goToSearch = () => {
    this.props.navigation.navigate("Search");
  };

  goToCreateCard = () => {
    console.log("Pressed");
  };

  render() {
    return (
      <View>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated />

        <ImageBackground
          source={require("../assets/bkgrd.jpg")}
          style={{ width: "100%", height: "100%" }}
          blurRadius={1}
        >
          <View style={styles.mainContainer}>
            <View style={styles.firContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>ASHYQ HATTAR</Text>
                <Text style={styles.additionalText}>
                  Барлық ашық хаттар мен құттықтаулар бір жерде!
                </Text>
              </View>

              <Button
                color="#FF473A"
                title="Іздеу!"
                onPress={this.goToSearch}
              />
            </View>
            {/* <View style={styles.secContrainer}>
              <Text style={styles.additionalText}>
                Немесе өзің жеке дизайнды құрастыру!
              </Text>
              <Button
                color="#FFC820"
                title="Жасау!"
                onPress={this.goToCreateCard}
              />
            </View> */}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  firContainer: {
    flex: 1,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 3,
    justifyContent: "center"
  },
  textContainer: {
    width: Dimensions.get("window").width - Dimensions.get("window").width / 2
  },
  mainText: {
    color: "white",
    fontFamily: "Montserrat-Regular",
    fontSize: 40,
    marginBottom: 20
  },
  additionalText: {
    marginBottom: 20,
    color: "white",
    fontFamily: "Montserrat-Regular",
    fontSize: 12
  },
  secContrainer: {
    marginBottom: 50,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 3,
    justifyContent: "center"
  }
});

export default WelcomeScreen;
