import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions
} from "react-native";
import { Card, Icon } from "react-native-elements";
import Fire from "../Fire";
import * as firebase from "firebase";
import "firebase/firestore";
const PAGE_SIZE = 4;
const collectionName = "cards";
export default class Posts extends React.Component {
  state = {
    data: {},
    posts: [],
    loading: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Your Posts",
    headerStyle: {
      backgroundColor: "rgba(13,71,161,0.9)"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts
      };
      return {
        data,
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      };
    });
  };

  makeRemoteRequest = async lastKey => {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });
    const { data } = await Fire.shared.getMyPage();
    console.log(data.length);
    if (data.length === 0) {
      console.log("true");
      let posts = {};
      data.push({
        key: "0",
        title: "--",
        detail: "no post found",
        contact: "-------"
      });
      for (let child of data) {
        posts[child.key] = child;
      }
      this.addPosts(posts);
      this.setState({ loading: false });
    } else {
      let posts = {};
      for (let child of data) {
        posts[child.key] = child;
      }
      this.addPosts(posts);
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  renderRow = ({ item }) => {
    return (
      <Card containerStyle={styles.card} title={item.title}>
        <Text style={styles.detail}>{item.detail}</Text>
        <Text style={styles.contact}>{item.contact}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Icon
            raised
            name="md-trash"
            type="ionicon"
            color="rgba(13,71,161,0.9)"
            onPress={() =>
              firebase
                .firestore()
                .collection("cards")
                .doc(item.key)
                .delete()
                .then(() => {
                  this.props.navigation.navigate("main");
                  alert("Your Post has been deleted");
                })
            }
          />
        </View>
      </Card>
    );
  };
  _onRefresh = () => this.makeRemoteRequest();
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
            />
          }
          onPressFooter={this.onPressFooter}
          data={this.state.posts}
          renderItem={this.renderRow}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "rgba(13,71,161,0.9)",
    borderRadius: 25,
    marginTop: 17,
    marginBottom: 4
  },
  footer: {
    flexDirection: "row"
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "300",
    paddingTop: 10,
    alignSelf: "center"
  },
  slide: {
    flexDirection: "row"
  },
  card: {
    width: Dimensions.get("window").width - 60
  },
  contact: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(13,71,161,0.8)",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  detail: {
    marginBottom: 30,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "300"
  }
});
