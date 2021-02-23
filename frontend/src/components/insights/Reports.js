import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      symbol: "",
      loading: false,
      hasData: false,
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();
    const { symbol } = this.state;
    this.setState({ loading: true });
    if (symbol === "") {
      this.setState({
        errors: { symbol: "Symbol is required." },
        loading: false,
      });
      return;
    }

    const options = {
      method: "GET",
      url:
        "https://yahoo-finance-low-latency.p.rapidapi.com/ws/insights/v1/finance/insights",
      params: { symbol: symbol },
      headers: {
        "x-rapidapi-key": "e573b7a224msh2cb10ff25358022p1b71f1jsn0e0ef0747e4b",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        // console.log(
        //   response.data.finance.result.reports.map((item) => {
        //     return {
        //       ...item,
        //       publishedOn: new Date(item.publishedOn),
        //     };
        //   })
        // );
        // console.log(response.data.finance.result.reports.publishedOn);
        // console.log(response.data);
        this.setState({
          data: {
            columns: [
              {
                label: "Title",
                field: "title",
                sort: "asc",
                width: 50,
                minimal: "lg",
              },
              {
                label: "Date",
                field: "publishedOn",
                sort: "asc",
                width: 50,
                minimal: "lg",
              },
              {
                label: "Report",
                field: "summary",
                sort: "asc",
                width: 200,
              },
            ],
            rows: response.data.finance.result.reports.map((item) => {
              return {
                ...item,
                publishedOn: new Date(item.publishedOn).toLocaleString("en-US"),
              };
            }),
          },
          hasData: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(this.state.data);

    this.setState({
      symbol: "",
      errors: {},
      loading: false,
    });
  };

  render() {
    const { data, symbol, errors, loading, hasData } = this.state;
    return (
      <div
        className="container mt-5"
        style={{
          height: "100%",
          width: "100%",
          paddingTop: "5rem",
          paddingBottom: "10rem",
        }}
      >
        <div className="d-flex justify-content-center mb-5">
          <div className="card w-50">
            <div className="card-header">Get Report</div>
            <div className="card-body">
              <div className="form-group">
                <form onSubmit={this.onSubmit}>
                  <TextInputGroup
                    label="Symbol"
                    name="symbol"
                    placeholder="e.g., AMZN, TSLA, MSFT, AAPL"
                    type="text"
                    value={symbol}
                    onChange={this.onChange}
                    error={errors.symbol}
                    maxLength="4"
                  />
                  <input
                    disabled={loading}
                    type="submit"
                    value="Generate Report"
                    className="btn btn-block btn-dark"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        {hasData && <MDBDataTable hover bordered data={data} />}
      </div>
    );
  }
}

export default Reports;
