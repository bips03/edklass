import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import firebase from "./server/firebase";
import { Provider , connect } from "react-redux";
import { createStore } from "redux";
import { combinedReducers } from "./store/reducer";
import { setUser } from "./store/actioncreator";

const store = createStore(combinedReducers)

const Index = (props) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user)
        props.history.push("/");
      }else{
        props.setUser(null)
        props.history.push('/signin')
      }
    });
  }, []);


  return (
    <Switch>
      <Route path="/signin" exact>
        <Login />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser : state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser : (user) => dispatch(setUser(user))
  }
}

const IndexWithRouter = withRouter(connect(mapStateToProps,mapDispatchToProps)(Index));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Router>
        <IndexWithRouter />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
