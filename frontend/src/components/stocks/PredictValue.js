import axios from "axios";
import React, { Component } from "react";
import TextFairValue from "../layout/TextFairValue";
import TextInputGroup from "../layout/TextInputGroup";

class PredictValue extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
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
    server_error: "",
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
    if (open.match(/[a-zA-Z]{1,}/g)) {
      this.setState({
        errors: {
          open:
            "Please enter a correct number (use comma for thousand separator and dot for decimal separator)",
        },
      });
      return;
    }

    if (fifty_two_lo === "") {
      this.setState({ errors: { fifty_two_lo: "52 week low is required." } });
      return;
    }
    if (fifty_two_lo.match(/[a-zA-Z]{1,}/g)) {
      this.setState({
        errors: {
          fifty_two_lo:
            "Please enter a correct number (use comma for thousand separator and dot for decimal separator)",
        },
      });
      return;
    }

    if (fifty_two_hi === "") {
      this.setState({ errors: { fifty_two_hi: "52 week high is required." } });
      return;
    }
    if (fifty_two_hi.match(/[a-zA-Z]{1,}/g)) {
      this.setState({
        errors: {
          fifty_two_hi:
            "Please enter a correct number (use comma for thousand separator and dot for decimal separator)",
        },
      });
      return;
    }

    if (volume === "") {
      this.setState({ errors: { volume: "Volume is required." } });
      return;
    }
    if (volume.match(/[a-zA-Z]{1,}/g)) {
      this.setState({
        errors: {
          volume:
            "Please enter a correct number (use comma for thousand separator and dot for decimal separator)",
        },
      });
      return;
    }
    if (avg_volume === "") {
      this.setState({ errors: { avg_volume: "Average Volume is required." } });
      return;
    }
    if (avg_volume.match(/[a-zA-Z]{1,}/g)) {
      this.setState({
        errors: {
          avg_volume:
            "Please enter a correct number (use comma for thousand separator and dot for decimal separator)",
        },
      });
      return;
    }
    if (market_cap === "") {
      this.setState({ errors: { market_cap: "Market Cap is required." } });
      return;
    }
    if (
      market_cap.match(
        /^(\d{1,3},{1})*\d{1,}[.]?\d*([ACDEFGHIGLNOPQRSUVWXYZ]|[a-z])?$/g
      )
    ) {
      this.setState({
        errors: {
          market_cap:
            "Please use T (trillions), B (Billions), M (Millions), and K (Thousands) for market cap",
        },
      });
      return;
    }

    if (pe_ratio === "") {
      this.setState({ errors: { pe_ratio: "PE ratio is required." } });
      return;
    }
    if (pe_ratio.match(/[a-zA-Z]{1,}/g)) {
      this.setState({
        errors: {
          pe_ratio:
            "Please enter a correct number (use comma for thousand separator and dot for decimal separator)",
        },
      });
      return;
    }
    if (eps_ratio === "") {
      this.setState({ errors: { eps_ratio: "EPS ratio is required." } });
      return;
    }
    if (eps_ratio.match(/[a-zA-Z]{1,}/g)) {
      this.setState({
        errors: {
          eps_ratio:
            "Please enter a correct number (use comma for thousand separator and dot for decimal separator)",
        },
      });
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
    }).catch((err) => {
      console.log(err);
      this.setState({ server_error: "backend server has issues" });
    });

    if (res) {
      const data = await JSON.parse(res.data);
      this.setState({ fair_value: data });
      this.setState({ server_error: "" });
      // console.log(this.state.fair_value);
    }

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
      server_error,
    } = this.state;

    return (
      <div className="card m-auto shadow p-3 mb-5 bg-white rounded">
        <div className="card-header">
          <span>Stock Features For Prediction </span>
          <i className="fas fa-cogs"></i>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
                <TextInputGroup
                  label="Average Volume"
                  name="avg_volume"
                  value={avg_volume}
                  placeholder="e.g., 4,401,834"
                  type="text"
                  onChange={this.onChange}
                  error={errors.avg_volume}
                  maxLength="10"
                />
              </div>
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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

              <div className="container">
                <div className="text-right">
                  <input
                    type="submit"
                    value="Predict"
                    className="btn btn-lg btn-dark"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        {fair_value && <TextFairValue val={fair_value.fair_value} />}
        {server_error && <div className=" alert-danger">{server_error}</div>}
      </div>
    );
  }
}

export default PredictValue;
