import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinners";
import DailyStocks from "../stocks/DailyStocks";
import StockProfile from "./StockProfile";

class Stock extends Component {
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
    } = this.props;
    if (
      symbol &&
      open &&
      fifty_two_lo &&
      fifty_two_hi &&
      volume &&
      avg_volume &&
      market_cap &&
      pe_ratio &&
      eps_ratio
    ) {
      return (
        <div className="row">
          <div className="col-5">
            <div className="card card-body shadow p-3 mb-5 bg-white rounded">
              <h4>
                {symbol} <i className="fas fa-chart-pie"></i>
              </h4>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Stock Metrics</th>
                    <th scope="col">Values</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Open Price</td>
                    <td>{open}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>52 Week Range</td>
                    <td>
                      {fifty_two_lo} - {fifty_two_hi}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Volume</td>
                    <td>{volume}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Average Volume</td>
                    <td>{avg_volume}</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Market Cap</td>
                    <td>{market_cap}</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>PE Ratio (TTM)</td>
                    <td>{pe_ratio}</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>EPS (TTM)</td>
                    <td>{open}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-7">
            <div className="card card-body shadow p-3 mb-5 bg-white rounded">
              <DailyStocks stockName={symbol} />
            </div>
          </div>
          <div className="col">
            <div className="card card-body shadow p-3 mb-5 bg-white rounded">
              <StockProfile symbol={symbol} />
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Stock.propTypes = {
  symbol: PropTypes.string,
  open: PropTypes.string,
  fifty_two_lo: PropTypes.string,
  fifty_two_hi: PropTypes.string,
  volume: PropTypes.string,
  avg_volume: PropTypes.string,
  pe_ratio: PropTypes.string,
  eps_ratio: PropTypes.string,
};

export default Stock;
