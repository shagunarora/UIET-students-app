import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import Login from "/home/shagun/UIET-students-app/src/pages/Login";
import Signup from "/home/shagun/UIET-students-app/src/pages/signup";
import Loading from "/home/shagun/UIET-students-app/src/pages/Loading";
import Main from "/home/shagun/UIET-students-app/src/pages/Main";
import Review from "/home/shagun/UIET-students-app/src/pages/form";
import Posts from "/home/shagun/UIET-students-app/src/pages/myPost";
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
          <Scene key="form" component={Review} title="form" />
          <Scene key="myPost" component={Posts} title="myPost" />
          <Scene key="main" component={Main} title="main" />
        </Stack>
      </Router>
    );
  }
}
