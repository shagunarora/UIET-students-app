import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 140, height: 140 }}
          source={require("/home/shagun/UIET-students-app/src/images/uiet.png")}
        />

        <Text style={styles.logoText}>
          University Institute of Engineering and Technology
        </Text>
        <Text style={styles.logoText}>Panjab University</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
    marginBottom: 40
  },
  logoText: {
    color: "#0d47a1",
    fontSize: 13,
    fontWeight: "bold"
  }
});
