import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";

class PredictValue extends Component {
  state = {
    symbol: "",
    open: "",
    fifty_two_lo: "",
    fifty_two_hi: "",
    volume: "",
    avg_volume: "",
    market_cap: "",
    pe_ratio: "",
    eps_ratio: "",
    errors: {},
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    // console.log("submit");
    e.preventDefault();
    const {
      symbol,
      open,
      fifty_two_lo,
      fifty_two_hi,
      volume,
      avg_volume,
      market_cap,
      pe_ratio,
      eps_ratio,
    } = this.state;

    if (symbol === "") {
      // console.log("break");
      this.setState({ errors: { symbol: "Symbol is required." } });
      // console.log(this.state.errors);
      // console.log("break");
      return;
    }
    if (open === "") {
      this.setState({ errors: { open: "Open price is required." } });
      // console.log(this.state.errors);
      return;
    }
    if (fifty_two_lo === "") {
      this.setState({ errors: { fifty_two_lo: "52 week low is required." } });
      return;
    }
    if (fifty_two_hi === "") {
      this.setState({ errors: { fifty_two_hi: "52 week high is required." } });
      return;
    }
    if (volume === "") {
      this.setState({ errors: { volume: "Volume is required." } });
      return;
    }
    if (avg_volume === "") {
      this.setState({ errors: { avg_volume: "Average Volume is required." } });
      return;
    }
    if (market_cap === "") {
      this.setState({ errors: { market_cap: "Market Cap is required." } });
      return;
    }
    if (pe_ratio === "") {
      this.setState({ errors: { pe_ratio: "PE ratio is required." } });
      return;
    }
    if (eps_ratio === "") {
      this.setState({ errors: { eps_ratio: "EPS ratio is required." } });
      return;
    }

    this.setState({
      symbol: "",
      open: "",
      fifty_two_lo: "",
      fifty_two_hi: "",
      volume: "",
      avg_volume: "",
      market_cap: "",
      pe_ratio: "",
      eps_ratio: "",
      errors: {},
    });
  };

  render() {
    const {
      symbol,
      open,
      fifty_two_lo,
      fifty_two_hi,
      volume,
      avg_volume,
      market_cap,
      pe_ratio,
      eps_ratio,
      errors,
    } = this.state;
    return (
      <div className="card m-3">
        <div className="card-header">
          <span>Stock Features For Prediction </span>
          <i className="fas fa-cogs"></i>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextInputGroup
                label="Symbol"
                name="symbol"
                placeholder="e.g. AMZN, TLSA, MFST"
                type="text"
                value={symbol}
                onChange={this.onChange}
                error={errors.symbol}
                maxLength="4"
              />
              <TextInputGroup
                label="Open Price"
                name="open"
                value={open}
                placeholder="e.g. 3,218.51"
                type="text"
                onChange={this.onChange}
                error={errors.open}
                maxLength="10"
              />
              <TextInputGroup
                label="52 weeks low"
                name="fifty_two_lo"
                value={fifty_two_lo}
                placeholder="e.g. 1,626.03"
                type="text"
                onChange={this.onChange}
                error={errors.fifty_two_lo}
                maxLength="10"
              />
              <TextInputGroup
                label="52 weeks high"
                name="fifty_two_hi"
                value={fifty_two_hi}
                placeholder="e.g. 3,552.25"
                type="text"
                onChange={this.onChange}
                error={errors.fifty_two_hi}
                maxLength="10"
              />
              <TextInputGroup
                label="Volume"
                name="volume"
                value={volume}
                placeholder="e.g. 4,394,815"
                type="text"
                onChange={this.onChange}
                error={errors.volume}
                maxLength="10"
              />
              <TextInputGroup
                label="Average Volume"
                name="avg_volume"
                value={avg_volume}
                placeholder="e.g. 4,401,834"
                type="text"
                onChange={this.onChange}
                error={errors.volume}
                maxLength="10"
              />
              <TextInputGroup
                label="Market Cap"
                name="market_cap"
                value={market_cap}
                placeholder="e.g. 1.575T, 1.45B, 1.3M"
                type="text"
                onChange={this.onChange}
                error={errors.market_cap}
                maxLength="10"
              />
              <TextInputGroup
                label="PE ratio (TTM)"
                name="pe_ratio"
                value={pe_ratio}
                placeholder="e.g. 91.76"
                type="text"
                onChange={this.onChange}
                error={errors.pe_ratio}
                maxLength="10"
              />
              <TextInputGroup
                label="EPS Ratio (TTM)"
                name="eps_ratio"
                value={eps_ratio}
                placeholder="e.g. 34.20"
                type="text"
                onChange={this.onChange}
                error={errors.eps_ratio}
                maxLength="10"
              />
            </div>
            <input
              type="submit"
              value="Predict"
              className="btn btn-block btn-dark"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default PredictValue;
