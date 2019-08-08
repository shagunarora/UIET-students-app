import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

export default class Review extends Component {
  state = {
    title: "",
    detail: "",
    errorMessage: null,
    contact: ""
  };

  handleForm = () => {
    this.props.navigation.navigate("main");
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text
          style={{
            alignContent: "center",
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 10,
            color: "rgba(13,71,161,0.9)"
          }}
        >
          ADD POST
        </Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}

        <TextInput
          style={styles.inputBox}
          placeholder="Title"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          autoCorrect={false}
        />
        <TextInput
          style={styles.inputBoxDetail}
          multiline={true}
          placeholder="description"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={detail => this.setState({ detail })}
          value={this.state.detail}
          autoCorrect={false}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="contact"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={contact => this.setState({ contact })}
          value={this.state.contact}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleForm}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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

  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(13,71,161,0.5)",
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 25,
    fontSize: 15,
    color: "#fff"
  },
  inputBoxDetail: {
    width: 300,
    height: 150,
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
    borderRadius: 20
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "300",
    paddingHorizontal: 120,
    paddingTop: 12
  }
});
