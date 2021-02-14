import React, { Component } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCard,
  MDBBadge,
} from "mdbreact";
import DeerParticles from "../layout/DeerParticles";

class Sector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isSaveLocal: false,
      activeItem: "1",
    };

    this.getSectors = this.getSectors.bind(this);
  }

  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  getSectors = async () => {
    const options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: { function: "SECTOR" },
      headers: {
        "x-rapidapi-key": "e573b7a224msh2cb10ff25358022p1b71f1jsn0e0ef0747e4b",
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        // console.log(response.data);
        this.setState({ data: response.data });
        sessionStorage.setItem("data", JSON.stringify(this.state.data));
        sessionStorage.setItem("isSaveLocal", true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  sort_arr_dsc = (arr) => {
    let sortable = [];
    for (let sector in arr) {
      sortable.push([sector, parseFloat(arr[sector])]);
    }

    return sortable.sort((a, b) => {
      return b[1] - a[1];
    });
  };

  create_table_row = (arr) => {
    return arr.map((sector, i) => (
      <React.Fragment key={sector}>
        <tr>
          <td>{i + 1}.</td>
          <td>{sector[0]}</td>
          <td>
            {sector[1] > 0 ? (
              <h5>
                <MDBBadge pill color="success">
                  {sector[1]} %
                </MDBBadge>
              </h5>
            ) : (
              <h5>
                <MDBBadge pill color="danger">
                  {sector[1]} %
                </MDBBadge>
              </h5>
            )}
          </td>
        </tr>
      </React.Fragment>
    ));
  };

  componentDidMount() {
    // store data in local storage since Alpha Vantage API only allows
    // 5 request per minute
    const isSaveLocal = sessionStorage.getItem("isSaveLocal") === "true";
    let data = {};
    if (isSaveLocal) {
      data = JSON.parse(sessionStorage.getItem("data"));
      this.setState({ data: data });
    } else {
      this.getSectors();
    }
    // const data = isSaveLocal
    //   ? JSON.parse(sessionStorage.getItem("data"))
    //   : this.getSectors().then((res) => {
    //       data = res;
    //     });
    // console.log("break1");
    // console.log(data);

    const ranking_today = this.sort_arr_dsc(data["Rank B: 1 Day Performance"]);

    // let sortable = [];
    // for (let sector in ranking_today) {
    //   sortable.push([sector, parseFloat(ranking_today[sector])]);
    // }

    // const sorted_ranking_today = sortable.sort((a, b) => {
    //   return b[1] - a[1];
    // });

    this.setState({ ranking_today });
  }

  render() {
    const { data } = this.state;
    const ranking_today = this.sort_arr_dsc(data["Rank B: 1 Day Performance"]);
    const ranking_1_month = this.sort_arr_dsc(
      data["Rank D: 1 Month Performance"]
    );
    const ranking_1_year = this.sort_arr_dsc(
      data["Rank G: 1 Year Performance"]
    );
    const ranking_5_year = this.sort_arr_dsc(
      data["Rank I: 5 Year Performance"]
    );
    const ranking_10_year = this.sort_arr_dsc(
      data["Rank J: 10 Year Performance"]
    );
    const performance_1_day = this.create_table_row(ranking_today);
    const performance_1_month = this.create_table_row(ranking_1_month);
    const performance_1_year = this.create_table_row(ranking_1_year);
    const performance_5_year = this.create_table_row(ranking_5_year);
    const performance_10_year = this.create_table_row(ranking_10_year);

    if (ranking_today) {
    }
    return (
      <>
        <MDBContainer>
          <h1 className="mt-5">Stock Market Performance</h1>
          <MDBNav className="nav-tabs mt-5">
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "1"}
                onClick={this.toggle("1")}
                role="tab"
              >
                1 Day Performance
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "2"}
                onClick={this.toggle("2")}
                role="tab"
              >
                1-Month Performance
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "3"}
                onClick={this.toggle("3")}
                role="tab"
              >
                1-Year Performance
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "4"}
                onClick={this.toggle("4")}
                role="tab"
              >
                5-Year Performance
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "5"}
                onClick={this.toggle("5")}
                role="tab"
              >
                10-Year Performance
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId="1" role="tabpanel">
              <p className="m-5">
                1 Day performance indicates the calculation which combines
                companies that have reported financial reports in different
                quarters.
              </p>
              <MDBCard>
                <MDBTable striped hover responsive>
                  <MDBTableHead color="dark">
                    <tr>
                      <th>Ranking #</th>
                      <th>Sector Name</th>
                      <th>%</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>{performance_1_day}</MDBTableBody>
                </MDBTable>
              </MDBCard>
            </MDBTabPane>
            <MDBTabPane tabId="2" role="tabpanel">
              <p className="m-5">
                30 Days Stock Performance calculation may combine companies, who
                have repoted financial results in different quarters.
              </p>
              <MDBCard>
                <MDBTable striped hover responsive>
                  <MDBTableHead color="dark">
                    <tr>
                      <th>Ranking #</th>
                      <th>Sector Name</th>
                      <th>%</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>{performance_1_month}</MDBTableBody>
                </MDBTable>
              </MDBCard>
            </MDBTabPane>
            <MDBTabPane tabId="3" role="tabpanel">
              <p className="m-5">
                Year To Date Stock Performance calculation may combine
                companies, who have repoted financial results in different
                quarters.
              </p>
              <MDBCard>
                <MDBTable striped hover responsive>
                  <MDBTableHead color="dark">
                    <tr>
                      <th>Ranking #</th>
                      <th>Sector Name</th>
                      <th>%</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>{performance_1_year}</MDBTableBody>
                </MDBTable>
              </MDBCard>
            </MDBTabPane>
            <MDBTabPane tabId="4" role="tabpanel">
              <p className="m-5">
                5 Years To Date Stock Performance calculation may combine
                companies, who have repoted financial results in different
                quarters.
              </p>
              <MDBCard>
                <MDBTable striped hover responsive>
                  <MDBTableHead color="dark">
                    <tr>
                      <th>Ranking #</th>
                      <th>Sector Name</th>
                      <th>%</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>{performance_5_year}</MDBTableBody>
                </MDBTable>
              </MDBCard>
            </MDBTabPane>
            <MDBTabPane tabId="5" role="tabpanel">
              <p className="m-5">
                10 Years To Date Stock Performance calculation may combine
                companies, who have repoted financial results in different
                quarters.
              </p>
              <MDBCard>
                <MDBTable striped hover responsive>
                  <MDBTableHead color="dark">
                    <tr>
                      <th>Ranking #</th>
                      <th>Sector Name</th>
                      <th>%</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>{performance_10_year}</MDBTableBody>
                </MDBTable>
              </MDBCard>
            </MDBTabPane>
          </MDBTabContent>
          <DeerParticles />
        </MDBContainer>
      </>
    );
  }
}

export default Sector;
