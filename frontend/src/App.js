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
import User from "./components/users/User";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";
import Footer from "./components/layout/Footer";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import ForgotPassword from "./components/users/ForgotPassword";
import UpdateUser from "./components/users/UpdateUser";
import TokenExpired from "./components/layout/TokenExpired";
import HomePage from "./components/pages/HomePage";
import PrivacyPolicy from "./components/layout/PrivacyPolicy";
import TermsOfUse from "./components/pages/TermsOfUse";
import Reports from "./components/insights/Reports";

class App extends Component {
  componentDidUpdate() {
    console.log("app");
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AuthProvider>
            <Header branding="Brand Value Analysis" />

            <Switch>
              <Route exact path="/" component={HomePage} />
              <>
                <div className="container">
                  <Route exact path="/about" component={About} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/findstock" component={FindStock} />
                  <PrivateRoute exact path="/reports" component={Reports} />
                  <PrivateRoute
                    exact
                    path="/predict"
                    component={PredictValue}
                  />
                  <PrivateRoute exact path="/user" component={User} />
                  <PrivateRoute
                    exact
                    path="/update-user"
                    component={UpdateUser}
                  />
                  <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                  <Route exact path="/privacy" component={PrivacyPolicy} />
                  <Route exact path="/term" component={TermsOfUse} />
                  <PrivateRoute
                    exact
                    path="/token-expired"
                    component={TokenExpired}
                  />
                  <Route exact path="/test" component={Test} />
                </div>
              </>
              <Route component={NotFound} />
            </Switch>
          </AuthProvider>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
