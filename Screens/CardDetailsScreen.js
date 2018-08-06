import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  StatusBar,
  Dimensions
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";

class CardDetailsScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Хатты көру</Text>
        </View>
      ),
      headerRight: (
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>ASHYQ</Text>
          <Text style={{ fontSize: 5 }}> </Text>
          <Text style={styles.headerText}>HATTAR</Text>
        </View>
      )
    };
  };

  state = {
    loading: false
  };

  _downloadImageAndShare(title, message, url) {
    this.setState({ loading: true });
    var self = this;

    RNFetchBlob.config({ fileCache: true })
      .fetch("GET", url)
      .then(resp => {
        console.log("here start ", resp.path());
        return resp.readFile("base64").then(base64 => {
          console.log("base64", base64);
          return { resp, base64 };
        });
      })
      .then(obj => {
        var headers = obj.resp.respInfo.headers;
        var type = headers["Content-Type"];
        var dataUrl = "data:" + type + ";base64," + obj.base64;
        return { title, message, url: dataUrl };
      })
      .then(opts => {
        self.setState({ loading: false });
        Share.open(opts);
      })
      .catch(err => {
        self.setState({ loading: false });
        console.log(err);
      });
  }

  constructor(props) {
    super(props);
    this._downloadImageAndShare = this._downloadImageAndShare.bind(this);
  }

  render() {
    const { navigation } = this.props;
    const photoUrl = navigation.getParam("url", null);

    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#000000" />

        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: photoUrl.toString()
          }}
        />

        <View style={styles.buttonContainer}>
          <Button
            color="#FF473A"
            disabled={this.state.loading}
            onPress={() =>
              this._downloadImageAndShare(
                "Ашық хат",
                "Бұл сурет Ashyq Hattar қосымшасынан алынған",
                photoUrl
              )
            }
            title={this.state.loading ? "Суретті жүктеу..." : "Суретпен бөлісу"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center"
  },
  titleText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    color: "#FF473A"
  },
  headerText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 10
  },
  headerTextContainer: {
    width: 45,
    height: 40,
    marginRight: 10
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  instructions: {
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: 200,
    left: Dimensions.get("window").width / 2 - 100
  }
});

export default CardDetailsScreen;
