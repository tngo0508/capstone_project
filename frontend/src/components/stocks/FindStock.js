import axios from "axios";
import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import Stock from "./Stock";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBFormInline,
  MDBAnimation,
} from "mdbreact";

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
      <div className="container">
        <MDBView>
          <MDBMask className="gradient" />
          <MDBContainer
            style={{ height: "100%", width: "100%", paddingTop: "5rem" }}
            className="d-flex justify-content-center align-items-center"
          >
            <MDBRow>
              <MDBCol md="6" className="text-center text-md-left mt-xl-5 mb-5">
                <MDBAnimation type="fadeInLeft" delay=".3s">
                  <h1 className="h1-responsive font-weight-bold mt-sm-5">
                    All you need is to invest in a good company
                  </h1>
                  <hr />
                  <h6 className="mb-4">
                    The application provides you financial information and
                    related news about your stock. It monitors daily trading of
                    the stock and generates financial report as needed.
                  </h6>
                </MDBAnimation>
                <MDBAnimation type="fadeInLeft" delay=".3s">
                  <div className="card m-0">
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
                            placeholder="e.g., AMZN, TSLA, MSFT, AAPL"
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
                </MDBAnimation>
              </MDBCol>

              <MDBCol md="6" xl="5" className="mt-xl-5">
                <MDBAnimation type="fadeInRight" delay=".3s">
                  <img
                    src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                    alt=""
                    className="img-fluid"
                  />
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>

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
