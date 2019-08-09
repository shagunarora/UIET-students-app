import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
export default class Card extends Component {
  componentDidMount() {
    this.setState({ arrayHolder: [...this.array] });
  }

  joinData = () => {
    this.array.push({ title: this.state.textInput_Holder });

    this.setState({ arrayHolder: [...this.array] });
  };

  render() {
    return <View />;
  }
}
