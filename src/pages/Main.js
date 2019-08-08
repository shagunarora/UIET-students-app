import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import firebase from "firebase";
import { Header } from "react-native-elements";

export default class Main extends React.Component {
  state = { currentUser: null, name: "..." };
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
          console.log(name);
          this.setState({ name });
        });
      });
  }
  logOutUser = () => {
    firebase.auth().signOut();
  };
  overlay = () => {
    this.props.navigation.navigate("form");
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="center"
          centerComponent={{
            text: "WELCOME" + "  " + this.state.name.toUpperCase(),

            style: { color: "#fff", fontSize: 17, fontWeight: "bold" }
          }}
          containerStyle={{
            backgroundColor: "rgba(13,71,161,0.9)",
            justifyContent: "center"
          }}
        />
        <TouchableOpacity style={styles.button} onPress={this.overlay}>
          <Text style={styles.buttonText}>AddPost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.logOutUser}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
    width: 300,
    height: 50,
    backgroundColor: "rgba(13,71,161,0.9)",
    borderRadius: 25,
    marginTop: 20
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "300",
    paddingTop: 10,
    alignSelf: "center"
  },
  slide: {
    flexDirection: "row"
  }
});
