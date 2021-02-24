import React, { useState, useEffect } from "react";
import { Spinner, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { db } from "../auth/firebase";
import { MDBIcon } from "mdbreact";
import TextInputGroup from "../layout/TextInputGroup";
import _ from "lodash";
import DeerParticles from "../layout/DeerParticles";
import { MDBJumbotron, MDBContainer } from "mdbreact";
import { MDBTypography, MDBBox, MDBBtn, MDBCollapse } from "mdbreact";
import Chart from "react-apexcharts";
import RandomColor from "randomcolor";

export default function Porfolio() {
  const [stocks, setstocks] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [symbolName, setSymbolName] = useState("");
  const [fund, setFund] = useState(0);
  const [error, setError] = useState({});
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);
  const [donut, setDonut] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const id = currentUser.uid;

  const ref = db.collection("porfolio").doc(id);

  const statePieChart = {
    series: series,
    options: {
      id: "porfolio",
      chart: {
        width: 500,
        type: "donut",
      },
      labels: labels,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Investment",
                formatter: () => "$" + getTotal(),
              },
            },
          },
        },
      },

      dataLabels: {
        enabled: true,
      },
      // colors: colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 270,
            },
            legend: {
              show: false,
              // position: "bottom",
            },
          },
        },
      ],
      legend: {
        position: "right",
        offsetY: 0,
        height: 230,
      },
    },
  };

  const stateColChart = {
    series: [
      {
        data: series,
        name: "Investment",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      // colors: colors,
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [...labels],
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  };

  const stateRadarChart = {
    series: [
      {
        name: "Investment",
        data: series,
      },
    ],
    options: {
      chart: {
        height: 320,
        type: "radar",
      },

      xaxis: {
        categories: labels,
      },
    },
  };

  const sort_dsc_by_value = (obj) => {
    const sort_arr = [];
    for (let key in obj) {
      sort_arr.push([key, Number(parseFloat(obj[key]))]);
    }
    sort_arr.sort((a, b) => a[1] - b[1]);
    let res = {};
    sort_arr.map((item) => (res[item[0]] = item[1]));
    return res;
  };

  useEffect(() => {
    const ref = db.collection("porfolio").doc(id);
    // console.log(ref);
    const getStocksFromDB = () => {
      setLoading(true);
      ref.onSnapshot((doc) => {
        // console.log(doc.exists);
        if (doc.exists) {
          const data = doc.data();
          const sorted_data = sort_dsc_by_value(data);
          setstocks(sorted_data);
          const funds = Object.values(sorted_data).map((item) =>
            Number(parseFloat(item))
          );
          // console.log(funds);
          setSeries(funds);
          const labels = Object.keys(sorted_data);
          setLabels(labels);
          const colors = funds.map((key) =>
            RandomColor({
              luminosity: "dark",
            })
          );
          setColors(colors);
          setDonut(true);
        }
        setLoading(false);
      });
    };

    getStocksFromDB();
    return () => getStocksFromDB();
  }, [id, donut]);

  if (loading) {
    return <Spinner />;
  }

  const toggleCollapse = (collapseID) => {
    setCollapse(collapse !== collapseID ? collapseID : "");
    // console.log(collapse);
  };

  const getTotal = () => {
    if (!_.isEmpty(stocks)) {
      // console.log(stocks);
      const total = Object.values(stocks).reduce(
        (a, b) => parseFloat(a) + parseFloat(b)
      );
      return parseFloat(total).toFixed(2);
    }
    return 0;
  };

  const onChangeSymbol = (e) => setSymbolName(e.target.value);
  const onChangeFund = (e) => setFund(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setDonut(false);
    if (symbolName === "") {
      setError({ symbol: "This field is required." });
      setLoading(false);
      return;
    }

    if (fund === 0) {
      setError({ fund: "Fund has to be larger than 0." });
      setLoading(false);
      return;
    }

    if (stocks) {
      stocks[symbolName] = Number(parseFloat(fund, 10).toFixed(2));
      const new_stocks = sort_dsc_by_value(stocks);
      setstocks(new_stocks);

      // console.log(stocks);
      ref.set(new_stocks).catch((err) => console.error(err));
    } else {
      const newStock = {};
      newStock[symbolName] = fund;
      ref.set(newStock).catch((err) => console.error(err));
    }

    setDonut(true);
    // clear state after submitting form
    setSymbolName("");
    setFund(0);
    setError("");
    setLoading(false);
  };

  const deleteStock = (key) => {
    delete stocks[key];
    setstocks(sort_dsc_by_value(stocks));
    // console.log(stocks);
    ref.set(stocks).catch((err) => console.error(err));
    if (_.isEmpty(stocks)) {
      db.collection("porfolio")
        .doc(id)
        .delete()
        .then(() => {
          // console.log("Document successfully deleted!");
          setDonut(false);
        })
        .catch((err) => console.error("Error removing document: ", err));
    }
  };

  return (
    <div className="m-5">
      <MDBJumbotron fluid>
        <MDBContainer>
          <p className="lead">Welcome, {currentUser.email}</p>
          <p className="text-muted lead">
            Please use the <strong>Investment Management</strong> box to manage
            and plan your investment strategy. Click on{" "}
            <strong>INSTRUCTION</strong> button to learn about different
            actions.
          </p>
          <>
            <MDBBtn
              color="info"
              onClick={() => toggleCollapse("basicCollapse")}
              style={{ marginBottom: "1rem" }}
            >
              Instruction
            </MDBBtn>
            <MDBCollapse id="basicCollapse" isOpen={collapse}>
              <>
                <MDBTypography blockquote bqColor="success">
                  <>
                    <MDBBox tag="p" mb={0} className="bq-title">
                      <>To add a new investment</>
                    </MDBBox>
                    <p>
                      Start typing the company name and the fund on the two
                      fields. Then, click on the <strong>ADD/UPDATE</strong>{" "}
                      button.
                    </p>
                  </>
                </MDBTypography>
                <MDBTypography blockquote bqColor="warning">
                  <>
                    <MDBBox tag="p" mb={0} className="bq-title">
                      <>To edit an investment</>
                    </MDBBox>
                    <p>
                      Start typing the name of the company that you want to
                      update and the amount of new fund. Then, click on the{" "}
                      <strong>ADD/UPDATE</strong> button.
                    </p>
                  </>
                </MDBTypography>
                <MDBTypography blockquote bqColor="danger">
                  <>
                    <MDBBox tag="p" mb={0} className="bq-title">
                      <>To delete/remove an investment from the list</>
                    </MDBBox>
                    <p>
                      Look through the list of investment on the right side.
                      Choose the brand/company that you want to remove from your
                      list. Then, click{" "}
                      <strong>
                        <i className="fas fa-trash"></i>
                      </strong>{" "}
                      button
                    </p>
                  </>
                </MDBTypography>
              </>
            </MDBCollapse>
          </>
        </MDBContainer>
      </MDBJumbotron>
      <div className="row">
        <div className="col-md-6 col-sm-12 mb-5">
          <div className="card">
            <div className="card-header">
              Investment Management <MDBIcon icon="edit" />
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <TextInputGroup
                  label="Brand Name / Stock Symbol"
                  name="symbol"
                  placeholder="Company name or stock symbol"
                  type="text"
                  value={symbolName}
                  error={error.symbol}
                  onChange={onChangeSymbol}
                />
                <TextInputGroup
                  label="Fund in U.S. Dollar"
                  name="fund"
                  placeholder="Enter the amount of fund"
                  value={fund}
                  type="number"
                  error={error.fund}
                  onChange={onChangeFund}
                />
                <input
                  disabled={loading}
                  type="submit"
                  value="Add/Update"
                  className="btn btn-block btn-dark"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <div className="card-header">
              Investment List <MDBIcon icon="th-list" />{" "}
            </div>
            <div className="card-body">
              {_.isEmpty(stocks) ? (
                <MDBTypography note noteColor="info" noteTitle="Note: ">
                  <>
                    Currently, you don't have any investments. Please use the{" "}
                    <strong>Investment Management</strong> on the left to add
                    new investment to your list.
                  </>
                </MDBTypography>
              ) : (
                Object.keys(stocks).map((key, idx) => (
                  <React.Fragment key={idx}>
                    <div className="d-flex align-self-center justify-content-between">
                      <span className="">{idx + 1}</span>
                      <span className="">{key} </span>
                      <span className="">$ {stocks[key]}</span>
                      <button
                        onClick={() => deleteStock(key)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </React.Fragment>
                ))
              )}
            </div>
            <div className="card-footer ">
              <h3 className="text-left">Total Investment:</h3>
              <h3 className="text-left">
                <Badge variant="light">$ {getTotal()}</Badge>
              </h3>
            </div>
          </div>
        </div>
      </div>
      {donut && (
        <div className="row my-5">
          <div className="col-md-6 col-sm-12 mb-5">
            <div className="chart-wrap">
              <div className="card">
                <div className="card-header">
                  Porfolio Plan <MDBIcon icon="chart-pie" />
                </div>
                <div className="card-body">
                  <div id="chart">
                    <Chart
                      options={statePieChart.options}
                      series={statePieChart.series}
                      type="donut"
                      width={450}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                Investment Radar <MDBIcon icon="satellite-dish" />
              </div>
              <div className="card-body">
                <Chart
                  options={stateRadarChart.options}
                  series={stateRadarChart.series}
                  type="radar"
                  height={450}
                />
              </div>
            </div>
          </div>
          <div className="col mt-5">
            <div className="chart-wrap">
              <div className="card">
                <div className="card-header">
                  Investment Distribution <MDBIcon icon="chart-bar" />
                </div>
                <div className="card-body">
                  <div id="chart">
                    <Chart
                      options={stateColChart.options}
                      series={stateColChart.series}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-none d-md-block">
        <DeerParticles />
      </div>
    </div>
  );
}
