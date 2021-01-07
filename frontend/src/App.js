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
import "./App.css";

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
            {/* <FindStock />
            <Stock
              symbol="Amazon"
              open="222.55"
              fifty_two_lo="123"
              fifty_two_hi="3245.5"
              volume="123455"
              avg_volume="1235"
              pe_ratio="24.0"
              eps_ratio="21.4"
            /> */}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
