import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import Logo from "../components/Logo";

import { Actions } from "react-native-router-flux";
import * as firebase from "firebase";
export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("main"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  login() {
    Actions.login();
  }
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}

        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="#fff"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signup}>
          <Text style={{ color: "#0d47a1" }}>Already have an Account?</Text>
          <TouchableOpacity onPress={this.login}>
            <Text style={{ color: "#0d47a1", fontWeight: "bold" }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1
  },
  signup: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexGrow: 1,
    flexDirection: "row"
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(13,71,161,0.5)",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 25,
    fontSize: 15,
    color: "#fff"
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
    paddingLeft: 115,
    paddingTop: 12
  }
});
