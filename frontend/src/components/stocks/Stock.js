import React, { Component } from "react";
import PropTypes from "prop-types";

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
      pe_ratio,
      eps_ratio,
    } = this.props;
    return (
      <div className="card card-body mb-3">
        <h4>
          {symbol} <i className="fas fa-chart-pie"></i>
        </h4>
        <ul className="list-group">
          <li className="list-group-item">open: {open}</li>
          <li className="list-group-item">52 weeks low: {fifty_two_lo}</li>
          <li className="list-group-item">52 weeks high: {fifty_two_hi}</li>
          <li className="list-group-item">volume: {volume}</li>
          <li className="list-group-item">avg_volume: {avg_volume}</li>
          <li className="list-group-item">pe_ratio: {pe_ratio}</li>
          <li className="list-group-item">eps_ratio: {eps_ratio}</li>
        </ul>
      </div>
    );
  }
}

Stock.defaultProps = {
  symbol: "Your stock",
  open: "null",
  fifty_two_lo: "null",
  fifty_two_hi: "null",
  volume: "null",
  avg_volume: "null",
  pe_ratio: "null",
  eps_ratio: "null",
};

Stock.propTypes = {
  symbol: PropTypes.string.isRequired,
  open: PropTypes.string.isRequired,
  fifty_two_lo: PropTypes.string.isRequired,
  fifty_two_hi: PropTypes.string.isRequired,
  volume: PropTypes.string.isRequired,
  avg_volume: PropTypes.string.isRequired,
  pe_ratio: PropTypes.string.isRequired,
  eps_ratio: PropTypes.string.isRequired,
};

export default Stock;
