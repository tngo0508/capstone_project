import React, { Component } from "react";
import axios from "axios";
// import Spinner from "../layout/Spinners";

class StockProfile extends Component {
  constructor(props) {
    super(props);
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      symbol: this.props.symbol,
      profile: {},
    };
  }

  getProfile = async () => {
    const options = {
      method: "GET",
      url:
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary",
      params: { symbol: this.state.symbol, region: "US" },
      headers: {
        "x-rapidapi-key": "e573b7a224msh2cb10ff25358022p1b71f1jsn0e0ef0747e4b",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then((res) => {
        // console.log(response.data);
        this.setState({ profile: res.data });
        // console.log(this.state.profile);
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(this.state.profile);
  };

  componentDidMount() {
    this.getProfile();
    // console.log(this.state.profile);
  }

  render() {
    const { profile } = this.state;
    // console.log(profile);
    if (Object.keys(profile).length === 0) {
      return null;
    } else {
      return (
        <div>
          <h5>
            Summary <i className="fas fa-clipboard-list"></i>
          </h5>
          <hr />
          {profile.summaryProfile.longBusinessSummary}
          <hr />
          <div className="row">
            <div className="col">
              <h5>Country: </h5> {profile.summaryProfile.country}
            </div>
            <div className="col">
              <h5>Employees: </h5> {profile.summaryProfile.fullTimeEmployees}
            </div>
            <div className="col">
              <h5>Sector: </h5> {profile.summaryProfile.sector}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default StockProfile;
