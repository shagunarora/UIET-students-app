import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as firebase from "firebase";

export default class Loading extends React.Component {
  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyDFx_wqBPRWE0wDBU7P3X3wSQJprU4pCdQ",
      authDomain: "uiet-students-app.firebaseapp.com",
      databaseURL: "https://uiet-students-app.firebaseio.com",
      projectId: "uiet-students-app",
      storageBucket: "",
      messagingSenderId: "121509860538",
      appId: "1:121509860538:web:07ec7e752ec2cf76"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "main" : "signup");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
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
  }
});
