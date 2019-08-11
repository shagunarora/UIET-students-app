import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import Fire from "../Fire";
import { Icon } from "react-native-elements";

export default class Review extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("users");
    this.state = {
      title: "",
      detail: "",
      contact: ""
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Create Post",
    headerStyle: {
      backgroundColor: "rgba(13,71,161,0.9)"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerRight: (
      <Icon
        raised
        size={17}
        name="md-share-alt"
        type="ionicon"
        color="rgba(13,71,161,0.9)"
        onPress={() => {
          const title = navigation.getParam("title");
          const detail = navigation.getParam("detail");
          const contact = navigation.getParam("contact");
          const email = navigation.getParam("email");
          if (title && detail && contact) {
            navigation.goBack();
            Fire.shared.post({
              title: title.trim(),
              detail: detail.trim(),
              contact: contact.trim(),
              email: email
            });
          } else {
            alert("You can't leave a field blank");
          }
        }}
      />
    )
    // headerRight: (
    //   <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
    //     <HeaderButtons.Item
    //       title="Share"
    //       onPress={() => {
    //         const text = navigation.getParam("text");
    //         const image = navigation.getParam("image");
    //         if (text && image) {
    //           navigation.goBack();
    //           Fire.shared.post({ text: text.trim(), image });
    //         } else {
    //           alert("Need valid description");
    //         }
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  });

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}

        <TextInput
          style={styles.inputBox}
          placeholder="Title"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={title => {
            this.setState({ title });
            this.props.navigation.setParams({ title });
          }}
          value={this.state.title}
          autoCorrect={false}
          multiline={true}
        />
        <TextInput
          style={styles.inputBoxDetail}
          multiline={true}
          placeholder="description"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={detail => {
            this.setState({ detail });
            this.props.navigation.setParams({ detail });
          }}
          value={this.state.detail}
          autoCorrect={false}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="contact"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={contact => {
            this.setState({ contact });
            this.props.navigation.setParams({ contact });
          }}
          value={this.state.contact}
          autoCorrect={false}
          multiline={true}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    backgroundColor: "white",

    flex: 1,

    paddingTop: 30
  },

  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(13,71,161,0.5)",
    borderRadius: 20,
    marginBottom: 25,
    paddingHorizontal: 25,
    fontSize: 15,
    color: "#fff"
  },
  inputBoxDetail: {
    width: 300,
    height: 150,
    backgroundColor: "rgba(13,71,161,0.5)",
    borderRadius: 25,
    marginBottom: 25,
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
