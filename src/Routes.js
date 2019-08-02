import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import Login from "/home/shagun/pu/src/pages/Login";
import Signup from "/home/shagun/pu/src/pages/signup";
import Loading from "/home/shagun/pu/src/pages/Loading";
import Main from "/home/shagun/pu/src/pages/Main";
export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" />
          <Scene key="signup" component={Signup} title="signup" />
          <Scene
            key="loading"
            component={Loading}
            title="loading"
            initial={true}
          />
          <Scene key="main" component={Main} title="main" />
        </Stack>
      </Router>
    );
  }
}
