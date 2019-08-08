import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default class Card extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.contact}>contact Details</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 30,

    padding: 20,
    margin: 24,
    borderColor: "#c0c8cc",
    borderWidth: 2,
    borderRadius: 20,
    borderTopRightRadius: 15,
    borderBottomWidth: 5,
    borderLeftWidth: 3,

    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  title: {
    fontSize: 40,
    height: 60,
    color: "#141f1f"
  },
  description: {
    fontSize: 30,
    height: 100,

    color: "#b0bec5"
  },
  contact: {
    fontSize: 20,
    color: "#b0bec5"
  }
});
