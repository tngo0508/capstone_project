import axios from "axios";
import React, { Component } from "react";
import TextFairValue from "../layout/TextFairValue";
import TextInputGroup from "../layout/TextInputGroup";

class PredictValue extends Component {
  state = {
    open: "",
    fifty_two_lo: "",
    fifty_two_hi: "",
    volume: "",
    avg_volume: "",
    market_cap: "",
    pe_ratio: "",
    eps_ratio: "",
    fair_value: "",
    errors: {},
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (e) => {
    // console.log("submit");
    e.preventDefault();
    const {
      open,
      fifty_two_lo,
      fifty_two_hi,
      volume,
      avg_volume,
      market_cap,
      pe_ratio,
      eps_ratio,
    } = this.state;

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
      open,
      fifty_two_lo,
      fifty_two_hi,
      volume,
      avg_volume,
      market_cap,
      pe_ratio,
      eps_ratio,
    });

    const res = await axios({
      method: "post",
      url: "http://localhost:8000/api/predict/",
      data: {
        open,
        fifty_two_lo,
        fifty_two_hi,
        volume,
        avg_volume,
        market_cap,
        pe_ratio,
        eps_ratio,
      },
    });

    const data = await JSON.parse(res.data);
    this.setState({ fair_value: data });
    // console.log(this.state.fair_value);

    // clear state after submitting form
    this.setState({
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
      open,
      fifty_two_lo,
      fifty_two_hi,
      volume,
      avg_volume,
      market_cap,
      pe_ratio,
      eps_ratio,
      fair_value,
      errors,
    } = this.state;
    return (
      <div className="card m-auto">
        <div className="card-header">
          <span>Stock Features For Prediction </span>
          <i className="fas fa-cogs"></i>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="Open Price"
                  name="open"
                  value={open}
                  placeholder="e.g., 3,218.51"
                  type="text"
                  onChange={this.onChange}
                  error={errors.open}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="52 weeks low"
                  name="fifty_two_lo"
                  value={fifty_two_lo}
                  placeholder="e.g., 1,626.03"
                  type="text"
                  onChange={this.onChange}
                  error={errors.fifty_two_lo}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="52 weeks high"
                  name="fifty_two_hi"
                  value={fifty_two_hi}
                  placeholder="e.g., 3,552.25"
                  type="text"
                  onChange={this.onChange}
                  error={errors.fifty_two_hi}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="Volume"
                  name="volume"
                  value={volume}
                  placeholder="e.g., 4,394,815"
                  type="text"
                  onChange={this.onChange}
                  error={errors.volume}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="Average Volume"
                  name="avg_volume"
                  value={avg_volume}
                  placeholder="e.g., 4,401,834"
                  type="text"
                  onChange={this.onChange}
                  error={errors.volume}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="Market Cap"
                  name="market_cap"
                  value={market_cap}
                  placeholder="e.g., 1.575T, 1.45B, 1.3M"
                  type="text"
                  onChange={this.onChange}
                  error={errors.market_cap}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="PE ratio (TTM)"
                  name="pe_ratio"
                  value={pe_ratio}
                  placeholder="e.g., 91.76"
                  type="text"
                  onChange={this.onChange}
                  error={errors.pe_ratio}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-auto">
                <TextInputGroup
                  label="EPS Ratio (TTM)"
                  name="eps_ratio"
                  value={eps_ratio}
                  placeholder="e.g., 34.20"
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
            </div>
          </form>
        </div>
        {fair_value && <TextFairValue val={fair_value.fair_value} />}
      </div>
    );
  }
}

export default PredictValue;
