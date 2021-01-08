import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinners";

// const stockItems = [
//   {
//     id: 1,
//     symbol: "AMZN",
//     open: 123.56,
//     fifty_two_lo: 144.6,
//     fifty_two_hi: 158.84,
//     volume: 500000,
//     avg_volume: 1234242424299,
//     pe_ratio: 20.5,
//     eps_ratio: 8.43,
//   },
//   {
//     id: 2,
//     symbol: "TLSA",
//     open: 123.56,
//     fifty_two_lo: 144.6,
//     fifty_two_hi: 158.84,
//     volume: 500000,
//     avg_volume: 1234242424299,
//     pe_ratio: 20.5,
//     eps_ratio: 8.43,
//   },
// ];

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
        // <div className="card card-body mb-3 w-50">
        //   <h4>
        //     {symbol} <i className="fas fa-chart-pie"></i>
        //   </h4>
        //   <ul className="list-group">
        //     <li className="list-group-item">Open Price: {open}</li>
        //     <li className="list-group-item">52 weeks low: {fifty_two_lo}</li>
        //     <li className="list-group-item">52 weeks high: {fifty_two_hi}</li>
        //     <li className="list-group-item">Volume: {volume}</li>
        //     <li className="list-group-item">Average Volume: {avg_volume}</li>
        //     <li className="list-group-item">Market Cap: {market_cap}</li>
        //     <li className="list-group-item">PE ratio: {pe_ratio}</li>
        //     <li className="list-group-item">EPS ratio: {eps_ratio}</li>
        //   </ul>
        // </div>

        <div className="card card-body">
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
      );
    } else {
      // return <div>spinner</div>;
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
