import axios from "axios";
import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import Stock from "./Stock";

class FindStock extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    symbol: "",
    errors: {},
    data: {},
    symbol_stock: "",
    hasData: false,
    displayGraph: false,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();
    const { symbol } = this.state;

    if (symbol === "") {
      this.setState({ errors: { symbol: "Symbol is required." } });
      // console.log(this.state.errors);
      return;
    }
    this.setState({ symbol_stock: symbol, hasData: true, data: {} });

    // console.log(symbol);
    // Send request to django endpoint
    const res = await axios("http://localhost:8000/api/getstock/" + symbol);
    const data = await JSON.parse(res.data);
    // console.log(data);
    this.setState({ data: data });

    // clear state after submitting form
    this.setState({
      // symbol: "",
      errors: {},
      // data: {},
    });
  };

  render() {
    // uncomment below for controlled component
    const { symbol, errors, data, symbol_stock, hasData } = this.state;

    // uncomment below for uncontrolled component
    // const { symbol } = this.props;

    return (
      <div className="container-fluid" align="center">
        <div className="card mb-3 w-50 border border-info">
          <div className="card-header">
            <span>Stock Information </span>
            <i className="fas fa-info-circle"></i>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextInputGroup
                  label="Symbol"
                  name="symbol"
                  placeholder="e.g., AMZN, TLSA, MSFT"
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
        {hasData && (
          <Stock
            symbol={symbol_stock}
            open={data.open_price}
            fifty_two_lo={data.fifty_two_wk_low}
            fifty_two_hi={data.fifty_two_wk_hi}
            volume={data.volume}
            avg_volume={data.avg_volume}
            market_cap={data.market_cap}
            pe_ratio={data.PE_ratio}
            eps_ratio={data.EPS_ratio}
          />
        )}
      </div>
    );
  }
}

export default FindStock;
