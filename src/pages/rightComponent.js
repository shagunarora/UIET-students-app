import React, { Component } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";

export default class RightComponent extends Component {
  logOutUser = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <View>
        <Icon
          raised
          size={17}
          name="md-log-out"
          type="ionicon"
          color="rgba(13,71,161,0.9)"
          onPress={this.logOutUser}
        />
      </View>
    );
  }
}
