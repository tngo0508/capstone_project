import axios from "axios";
import React, { Component } from "react";
import TextFairValue from "../layout/TextFairValue";
import TextInputGroup from "../layout/TextInputGroup";
import {
  Accordion,
  Card,
  Button,
  Container,
  ProgressBar,
} from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBCardTitle,
  MDBIcon,
  MDBBadge,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBAlert,
} from "mdbreact";
import BackgroundImg from "../../img/shattered-island.gif";
import SampleDataImg from "../../img/sample_data_set.png";
import BackendDesignImg from "../../img/backend_design.png";
import AccImg from "../../img/accuracy_sample.png";
import _ from "lodash";

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
    progress_bar_val: 0,
    is_open_filled: false,
    is_fifty_two_lo_filled: false,
    is_fifty_two_hi_filled: false,
    is_volume_filled: false,
    is_avg_volume_filled: false,
    is_market_cap_filled: false,
    is_pe_ratio_filled: false,
    is_eps_ratio_filled: false,
  };

  onChange = (e) => {
    const {
      progress_bar_val,
      is_open_filled,
      is_fifty_two_lo_filled,
      is_fifty_two_hi_filled,
      is_volume_filled,
      is_avg_volume_filled,
      is_market_cap_filled,
      is_pe_ratio_filled,
      is_eps_ratio_filled,
    } = this.state;

    this.setState({
      [e.target.name]: e.target.value,
    });

    if (
      !_.isEmpty(e.target.value) &&
      !is_open_filled &&
      e.target.name === "open" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_open_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "open" &&
      progress_bar_val > 0
    ) {
      this.setState({ progress_bar_val: progress_bar_val - 1, is_open: false });
    } else if (
      !_.isEmpty(e.target.value) &&
      !is_fifty_two_lo_filled &&
      e.target.name === "fifty_two_lo" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_fifty_two_lo_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "fifty_two_lo" &&
      progress_bar_val > 0
    ) {
      this.setState({
        progress_bar_val: progress_bar_val - 1,
        is_fifty_two_lo_filled: false,
      });
    } else if (
      !_.isEmpty(e.target.value) &&
      !is_fifty_two_hi_filled &&
      e.target.name === "fifty_two_hi" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_fifty_two_hi_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "fifty_two_hi" &&
      progress_bar_val > 0
    ) {
      this.setState({
        progress_bar_val: progress_bar_val - 1,
        is_fifty_two_hi_filled: false,
      });
    } else if (
      !_.isEmpty(e.target.value) &&
      !is_volume_filled &&
      e.target.name === "volume" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_volume_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "volume" &&
      progress_bar_val > 0
    ) {
      this.setState({
        progress_bar_val: progress_bar_val - 1,
        is_volume_filled: false,
      });
    } else if (
      !_.isEmpty(e.target.value) &&
      !is_avg_volume_filled &&
      e.target.name === "avg_volume" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_avg_volume_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "avg_volume" &&
      progress_bar_val > 0
    ) {
      this.setState({
        progress_bar_val: progress_bar_val - 1,
        is_avg_volume_filled: false,
      });
    } else if (
      !_.isEmpty(e.target.value) &&
      !is_market_cap_filled &&
      e.target.name === "market_cap" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_market_cap_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "market_cap" &&
      progress_bar_val > 0
    ) {
      this.setState({
        progress_bar_val: progress_bar_val - 1,
        is_market_cap_filled: false,
      });
    } else if (
      !_.isEmpty(e.target.value) &&
      !is_pe_ratio_filled &&
      e.target.name === "pe_ratio" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_pe_ratio_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "pe_ratio" &&
      progress_bar_val > 0
    ) {
      this.setState({
        progress_bar_val: progress_bar_val - 1,
        is_pe_ratio_filled: false,
      });
    } else if (
      !_.isEmpty(e.target.value) &&
      !is_eps_ratio_filled &&
      e.target.name === "eps_ratio" &&
      progress_bar_val < 8
    ) {
      this.setState({
        progress_bar_val: progress_bar_val + 1,
        is_eps_ratio_filled: true,
      });
    } else if (
      _.isEmpty(e.target.value) &&
      e.target.name === "eps_ratio" &&
      progress_bar_val > 0
    ) {
      this.setState({
        progress_bar_val: progress_bar_val - 1,
        is_eps_ratio_filled: false,
      });
    }
  };

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

    await axios({
      method: "post",
      url: "https://brandvalueanalysis.net/api/predict/",
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
    })
      .then((res) => {
        this.setState({ fair_value: res.data });
        this.setState({ server_error: "" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ server_error: "backend server has issues" });
      });

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
      progress_bar_val: 0,
      is_open_filled: false,
      is_fifty_two_lo_filled: false,
      is_fifty_two_hi_filled: false,
      is_volume_filled: false,
      is_avg_volume_filled: false,
      is_market_cap_filled: false,
      is_pe_ratio_filled: false,
      is_eps_ratio_filled: false,
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
      progress_bar_val,
    } = this.state;

    const progress_bar_percent = (progress_bar_val / 8) * 100;
    let progress_bar_variant = "danger";
    if (progress_bar_percent <= 20) {
      progress_bar_variant = "danger";
    } else if (progress_bar_percent <= 40) {
      progress_bar_variant = "info";
    } else if (progress_bar_percent <= 60) {
      progress_bar_variant = "primary";
    } else if (progress_bar_percent <= 80) {
      progress_bar_variant = "warning";
    } else {
      progress_bar_variant = "success";
    }

    return (
      <>
        <div
          className="container"
          style={{
            height: "100%",
            width: "100%",
            paddingTop: "10rem",
            paddingBottom: "10rem",
          }}
        >
          <div className="card m-auto shadow p-3 mb-5 bg-white rounded">
            <div className="card-header">
              <span>Metrics To Evaluate Stock </span>
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
                    <h5>
                      <MDBIcon icon="shield-alt" size="1x" /> Label Information
                    </h5>
                    <ul>
                      <li>
                        The price of the first trade for any listed stock is its
                        daily{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.investopedia.com/terms/o/openingprice.asp#:~:text=What%20Is%20Opening%20Price%3F,is%20its%20daily%20opening%20price."
                        >
                          <b>
                            <em>opening price</em>
                          </b>
                        </a>
                        .
                      </li>
                      <li>
                        The{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.financestrategists.com/finance-terms/52-week-high-low/#:~:text=The%2052%2Dweek%20high%2Flow,help%20predict%20its%20future%20movements."
                        >
                          <b>
                            <em>52-week high/low</em>
                          </b>
                        </a>{" "}
                        is the highest and lowest price has traded over the
                        prior 52-week period.
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.investopedia.com/articles/technical/02/010702.asp#:~:text=Volume%20measures%20the%20number%20of,viewed%20as%20strong%20and%20healthy."
                        >
                          <b>
                            <em>Volume</em>
                          </b>
                        </a>{" "}
                        can be an indicator of market strength, as rising
                        markets on increasing volume are typically viewed as
                        strong and healthy.
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.investopedia.com/terms/a/averagedailytradingvolume.asp#:~:text=Average%20daily%20trading%20volume%20(ADTV)%20is%20the%20average%20number%20of,find%20the%20average%20daily%20volume."
                        >
                          <b>
                            <em>Average daily trading volume (ADTV)</em>
                          </b>
                        </a>{" "}
                        is the average number of shares traded within a day in a
                        given stock.
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.fidelity.com/learning-center/trading-investing/fundamental-analysis/understanding-market-capitalization#:~:text=%22market%20caps.%22-,Market%20cap%E2%80%94or%20market%20capitalization%E2%80%94refers%20to%20the%20total%20value,market%20cap%20of%20%241%20billion."
                        >
                          <b>
                            <em>Market cap</em>
                          </b>
                        </a>
                        —or market capitalization—refers to the total value of
                        all a company's shares of stock. It is calculated by
                        multiplying the price of a stock by its total number of
                        outstanding shares.
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.investopedia.com/terms/t/ttm.asp#:~:text=The%20price%2Fearnings%20ratio%20is,earnings%20per%20share%20(EPS).&text=This%20marked%20improvement%20provides%20a%20clear%20snapshot%20of%20the%20company's%20growth%20trajectory."
                        >
                          <b>
                            <em>The price/earnings ratio</em>
                          </b>
                        </a>{" "}
                        is often referred to as P/E (TTM) and is calculated as
                        the stock's current price, divided by a company's
                        trailing 12-month earnings per share (EPS).
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.bankrate.com/glossary/e/earnings-per-share/#:~:text=Earnings%20per%20share%20(EPS)%20is,its%20shares%20of%20stock%20outstanding."
                        >
                          <b>
                            <em>Earnings per share (EPS)</em>
                          </b>
                        </a>{" "}
                        is a figure describing a public company’s profit per
                        outstanding share of stock, calculated on a quarterly or
                        annual basis. EPS is arrived at by taking a company’s
                        quarterly or annual net income and dividing by the
                        number of its shares of stock outstanding.
                      </li>
                    </ul>
                    <div className="text-right">
                      <input
                        type="submit"
                        value="Estimate"
                        className="btn btn-lg btn-dark"
                      />
                    </div>
                  </div>
                </div>
                <ProgressBar
                  variant={progress_bar_variant}
                  now={progress_bar_percent}
                  label={`${progress_bar_percent}%`}
                  className="my-3"
                />
              </form>
            </div>
            {fair_value && <TextFairValue val={fair_value.fair_value} />}
            {server_error && (
              <div className=" alert-danger">{server_error}</div>
            )}
          </div>
        </div>

        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBJumbotron style={{ padding: 0 }}>
                <MDBCol
                  className="text-white text-center py-5 px-4 my-5"
                  style={{
                    backgroundImage: `url(${BackgroundImg})`,
                  }}
                >
                  <MDBCol className="py-5">
                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                      FAQs Section
                    </MDBCardTitle>
                    <p className="mx-5 mb-5">
                      In below section, you will find information about what is
                      running behind the scene. It shows the design and analysis
                      of the machine learning models used to estimate the brand
                      or stock. Besides, you might find exciting answers that
                      involve the implementation of this feature. This section
                      also explains how the dataset is generated by web scraper
                      and how it gets further processed through several
                      preprocessing techniques and machine learning algorithms.
                    </p>
                  </MDBCol>
                </MDBCol>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <Container className="pb-5">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  How does this feature estimate the brand or stock value?{" "}
                  <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  The estimated result is a response from a Django RESTful API
                  endpoint. This backend API takes the user's inputs and
                  standardizes them to the normal distribution of pre-built
                  machine-learning model. The machine learning model is built
                  based on the training set and test set collected from a web
                  scraper.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  What does the sample dataset look like?{" "}
                  <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <img
                    src={SampleDataImg}
                    alt="SampleDataImg"
                    className="img-fluid"
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  What is the design of the backend?{" "}
                  <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <img
                    src={BackendDesignImg}
                    alt="SampleDataImg"
                    className="img-fluid"
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  What is the test set? <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  The test set is the list of NASDAQ100. The NASDAQ 100 covers
                  most of the largest technology companies in the United States
                  and a number from the rest of the world.
                  <br />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Nasdaq-100"
                  >
                    <MDBBadge color="primary">Learn More</MDBBadge>
                  </a>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  What is the training set? <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  The training set is the list of S&P500. The S&P 500 is a stock
                  market index that measures the performance of about 500
                  companies in the U.S. It includes companies across 11 sectors
                  to offer a picture of the health of the U.S. stock market and
                  the broader economy (from{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.nerdwallet.com/article/investing/what-is-sp-500"
                  >
                    Source
                  </a>
                  ) .
                  <br />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/S%26P_500"
                  >
                    <MDBBadge color="primary">Learn More</MDBBadge>
                  </a>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  How often does the web scraper run?{" "}
                  <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  The automation is set up to run web scraper{" "}
                  <strong>twice daily</strong>. The task scheduler (CRON) is
                  configured on a remote server. At{" "}
                  <strong>midnight (00:00 AM)</strong> and{" "}
                  <strong>midday (12:00 PM)</strong>, the web scraper runs
                  automatically.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="6">
                  What preprocess technique has been used?{" "}
                  <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://medium.com/@meetpatel12121995/handling-missing-values-d4b3378af549"
                  >
                    Drop Null Values
                  </a>
                  ,{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Standardization"
                  >
                    Standardization
                  </a>
                  ,{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://machinelearningmastery.com/random-oversampling-and-undersampling-for-imbalanced-classification/"
                  >
                    Ramdom Over Sampling
                  </a>
                  .
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="7">
                  What machine learning algorithms has been used?{" "}
                  <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm"
                  >
                    K-nearest neighbors algorithm (KNN)
                  </a>
                  <br />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Naive_Bayes_classifier"
                  >
                    Gaussian Naive Bayes (GBN)
                  </a>
                  <br />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Support-vector_machine"
                  >
                    Support Vector Machine (SVM)
                  </a>
                  .
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="8">
                  How often is the model built? <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="8">
                <Card.Body>
                  The model is built with fresh data{" "}
                  <strong>twice daily</strong>. At <strong>3:15 AM</strong> and{" "}
                  <strong>3:15 PM</strong>, the automation triggers the backend
                  server to run a script to re-build the model with newly
                  collected data from the webscraper
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="9">
                  What is the accuracy of the model?{" "}
                  <MDBIcon icon="caret-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="9">
                <Card.Body>
                  <MDBTable>
                    <MDBTableHead color="primary-color" textWhite>
                      <tr>
                        <th>Model</th>
                        <th>Accuracy</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>KNN</td>
                        <td>{"~ 68% - 80%"}</td>
                      </tr>
                      <tr>
                        <td>GNB</td>
                        <td> {"< 50%"}</td>
                      </tr>
                      <tr>
                        <td>SVM</td>
                        <td>{"~ 64% - 80%"}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                  <div className="pb-3">
                    <h4>Below is a example of the result of the analysis</h4>
                    <img src={AccImg} alt="SampleDataImg" className="" />
                  </div>
                  <MDBAlert color="warning">
                    WARNING: The model is not entirely accurate. The accuracy
                    usually vary every 3 hours. Besides, the model might be
                    prone to overfitting or underfitting.
                  </MDBAlert>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </>
    );
  }
}

export default PredictValue;
