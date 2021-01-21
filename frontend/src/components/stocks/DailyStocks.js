import React, { Component } from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

class DailyStock extends Component {
  constructor(props) {
    super(props);
    this.timeSeriesSetting = "DAILY";

    this.state = {
      stockName: this.props.stockName,

      stockChartXValues: [],
      stockChartYValues: [],

      series: [],
      // series: [{
      //   name: "STOCK ABC",
      //   data: series.monthDataSeries1.prices
      // }],
      options: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },

        title: {
          text: "Company ABC Daily Stocks",
          align: "left",
        },
        subtitle: {
          text: "Price Movements",
          align: "left",
        },
        labels: [],
        xaxis: {
          type: "datetime",
          labels: {
            show: true,
            // rotate: -45,
            // format: "dd/MM",
            maxHeight: 120,
            style: {
              colors: "black",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },
          },
          tickAmount: 100,
          // position: "top",
          tickPlacement: "on",
        },
        yaxis: {
          opposite: true,
          labels: {
            formatter: function (value) {
              return value.toString() + " USD";
            },
          },
        },
        legend: {
          horizontalAlign: "left",
        },
      },
    };

    this.fetchStock = this.fetchStock.bind(this);
  }

  componentDidUpdate() {
    if (this.state.stockName && this.state.stockName !== this.props.stockName) {
      this.setState(
        {
          stockName: this.props.stockName,
        },
        () => this.fetchStock()
      );
    }
  }

  componentDidMount() {
    console.log("dailystock");
    this.fetchStock();
  }

  fetchStock() {
    console.log(this.state.stockName);
    const API_KEY = "VH65CPTN371HAJQL";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.stockName}&outputsize=compact&apikey=${API_KEY}`;
    console.log(API_CALL);
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        const stockTimeSeries = Object.keys(data)[1];

        Object.keys(data[stockTimeSeries]).map((date) => {
          // console.log(date);
          stockChartXValuesFunction.push(date);
          const prices = Object.values(data[stockTimeSeries][date]);
          // console.log(prices);
          stockChartYValuesFunction.push(prices);

          return { stockChartXValuesFunction, stockChartYValuesFunction };
        });

        // console.log(stockChartXValuesFunction);
        // console.log(stockChartYValuesFunction);

        let temp = stockChartXValuesFunction.map((x, idx) => {
          return {
            x,
            y: stockChartYValuesFunction[idx].slice(0, 4).map((p) => {
              return parseFloat(p).toFixed(2);
            }),
          };
        });

        //console.log(temp);

        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          series: [
            {
              name: this.state.stockName,
              data: temp,
            },
          ],
          options: {
            ...this.state.options,
            title: {
              ...this.state.title,
              text:
                this.timeSeriesSetting + " trading for " + this.state.stockName,
            },
            labels: stockChartXValuesFunction,
          },
        });
      });
  }

  render() {
    //this.fetchStock();

    return (
      <div>
        <div className="row">
          <div className="col mt-5">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={350}
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

DailyStock.propsTypes = {
  stockName: PropTypes.string.isRequired,
  updateStockName: PropTypes.func.isRequired,
};

export default DailyStock;
