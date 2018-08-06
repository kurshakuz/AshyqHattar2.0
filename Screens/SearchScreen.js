import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar
} from "react-native";
import firebase from "../firebase";

const convertObjectToArr = data => {
  const arr = [];
  data.forEach(childSnapshot => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();

    arr.push(childData);
  });
  return arr;
};

class SearchScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Іздеу</Text>
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

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      collections: []
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref("collections")
      .once("value", data => {
        this.setState({
          collections: convertObjectToArr(data)
        });
      });
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.previewContainer}
        onPress={() => this.moveToFavorite(item)}
      >
        <Image source={{ uri: item.preview }} style={styles.previewImage} />
        <Text style={styles.previewText} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  moveToFavorite = favorite => {
    this.props.navigation.navigate("SearchDetails", {
      favorite: favorite
    });
  };

  startSearch = () => {};

  render() {
    let filteredCollections = this.state.collections.filter(collection => {
      return (
        collection.title
          .toLowerCase()
          .indexOf(this.state.text.toLowerCase()) !== -1
      );
    });

    return (
      <View style={styles.pageContainer}>
        <StatusBar backgroundColor="#000000" />

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchText}
            placeholder="Ашық хатты іздеу!"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            underlineColorAndroid="#FFFFFF"
          />
          <TouchableOpacity onPress={this.startSearch}>
            <Image
              style={styles.image}
              source={require("../assets/search.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 12 }}>
          <FlatList
            contentContainerStyle={styles.list}
            data={filteredCollections}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            numColumns={2}
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
  pageContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#FF473A",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  searchText: {
    width: 250,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#8A6F6D"
  },
  image: {
    marginTop: 10,
    height: 20,
    width: 20
  },
  list: {
    justifyContent: "center"
  },
  previewContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 2,
    alignItems: "center",
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").height / 4.5
  },
  previewImage: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 4.5 - 40
  },
  previewText: {
    width: Dimensions.get("window").width / 2 - 40,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Montserrat-Regular"
  }
});

export default SearchScreen;
