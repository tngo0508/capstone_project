import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";

class FindStock extends Component {
  state = {
    symbol: "",
    errors: {},
  };
  // uncontrolled component
  // constructor(props) {
  //   super(props);
  //   this.symbolInput = React.createRef();
  // }

  // use below for uncontrolled component
  // static defaultProps = {
  //   symbol: "AMZN",
  // };

  // uncomment below for controlled component
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { symbol } = this.state;
    // uncontrolled component
    // const stock = {
    //   symbol: this.symbolInput.current.value,
    // };

    // console.log(stock);

    if (symbol === "") {
      this.setState({ errors: { symbol: "Symbol is required." } });
      // console.log(this.state.errors);
      return;
    }
    // clear state after submitting form
    this.setState({
      symbol: "",
      errors: {},
    });
  };

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    // uncomment below for controlled component
    const { symbol, errors } = this.state;

    // uncomment below for uncontrolled component
    // const { symbol } = this.props;

    return (
      <div className="card mb-3 w-50">
        <div className="card-header">
          <span>Stock Information </span>
          <i className="fas fa-chart-pie"></i>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextInputGroup
                label="Symbol"
                name="symbol"
                placeholder="e.g. AMZN, TLSA, MSFT"
                type="text"
                value={symbol}
                onChange={this.onChange}
                error={errors.symbol}
                maxLength="4"
              />
            </div>
            <input
              type="submit"
              value="Find info"
              className="btn btn-block btn-dark"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default FindStock;
