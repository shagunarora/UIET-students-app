import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import firebase from "firebase";

export default class Main extends React.Component {
  state = { currentUser: null, name: "shagun" };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
  logOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    const { currentUser } = this.state;
    console.log(this.state.name);
    console.log(currentUser && currentUser.email);
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

    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Text>{this.state.name}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(13,71,161,0.9)",
    borderRadius: 25
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "300",
    paddingHorizontal: 120,
    paddingTop: 12
  }
});
