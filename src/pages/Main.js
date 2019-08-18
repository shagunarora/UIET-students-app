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
import firebase from "firebase";
import RightComponent from "/home/shagun/UIET-students-app/src/pages/rightComponent";
import { Header, Divider } from "react-native-elements";
import { Card } from "react-native-elements";
import Fire from "../Fire";

const PAGE_SIZE = 4;
export default class Main extends React.Component {
  state = {
    currentUser: null,
    name: "...",
    email: "",
    loading: false,
    data: {},
    posts: []
  };
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
    const { data, cursor } = await Fire.shared.getPaged({
      size: PAGE_SIZE,
      start: lastKey
    });

    this.lastKnownKey = cursor;
    let posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);
    this.setState({ loading: false });
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", currentUser && currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const name = doc.data().name;
          const email = doc.data().email;
          console.log(name);
          this.setState({ name });
          this.setState({ email });
        });
      })
      .then(() => {
        this.makeRemoteRequest();
      });
  }

  overlay = () => {
    this.props.navigation.push("form", { email: this.state.email });
  };
  myPost = () => {
    this.props.navigation.push("myPost", { email: this.state.email });
  };
  renderRow({ item }) {
    return (
      <View style={{ marginBottom: 20 }}>
        <Card containerStyle={styles.card} title={item.title}>
          <Text style={styles.detail}>{item.detail}</Text>
          <Text style={styles.contact}>{item.contact}</Text>
        </Card>
      </View>
    );
  }
  _onRefresh = () => this.makeRemoteRequest();
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="center"
          centerComponent={{
            text: "WELCOME" + "  " + this.state.name.toUpperCase(),

            style: { color: "#fff", fontSize: 17, fontWeight: "bold" }
          }}
          rightComponent={<RightComponent />}
          containerStyle={{
            backgroundColor: "rgba(13,71,161,0.9)",
            justifyContent: "center"
          }}
        />

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
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={this.overlay}>
            <Text style={styles.buttonText}>AddPost</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.myPost}>
            <Text style={styles.buttonText}>MyPost</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 7,
    alignSelf: "center"
  },
  slide: {
    flexDirection: "row"
  },
  card: {
    width: Dimensions.get("window").width - 60,
    borderColor: "#bcc2e0",
    elevation: 1
  },
  contact: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#bcc2e0",
    color: "#000",
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
