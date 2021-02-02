import React, { Component } from "react";
// import Stock from "./components/stocks/Stock";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import FindStock from "./components/stocks/FindStock";
import PredictValue from "./components/stocks/PredictValue";
import NotFound from "./components/pages/NotFound";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Test from "./components/test/Test";
import Profile from "./components/users/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";
import Footer from "./components/layout/Footer";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AuthProvider>
            <Header branding="Brand Value Analysis" />

            <div className="container">
              <Switch>
                <Route exact path="/" component={FindStock} />
                <Route exact path="/about" component={About} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/predict" component={PredictValue} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route exact path="/test" component={Test} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </AuthProvider>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
