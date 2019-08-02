import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import Routes from "/home/shagun/pu/src/Routes";

export default class App1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  }
});
