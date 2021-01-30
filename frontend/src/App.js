import React, { Component } from "react";
// import Stock from "./components/stocks/Stock";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import FindStock from "./components/stocks/FindStock";
import PredictValue from "./components/stocks/PredictValue";
import NotFound from "./components/pages/NotFound";
import Test from "./components/test/Test";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header branding="Brand Value Analysis" />

          <div className="container">
            <Switch>
              <Route exact path="/" component={FindStock} />
              <Route exact path="/about" component={About} />
              <Route exact path="/predict" component={PredictValue} />
              <Route exact path="/test" component={Test} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
