import React, { Component } from "react";
import axios from "axios";
import ShowMoreText from "react-show-more-text";
import he from "he";

class NewsFeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.symbol,
      news: {},
    };

    this.getNews = this.getNews.bind(this);
  }

  getNews = async () => {
    const options = {
      method: "GET",
      url: "https://yahoo-finance-low-latency.p.rapidapi.com/v2/finance/news",
      params: { symbols: this.state.symbol },
      headers: {
        "x-rapidapi-key": "e573b7a224msh2cb10ff25358022p1b71f1jsn0e0ef0747e4b",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        // console.log(response.data);
        this.setState({ news: response.data });
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(this.state.news);
  };

  get_news_from_apidojo = async () => {
    const options = {
      method: "GET",
      url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news",
      params: { category: this.state.symbol },
      headers: {
        "x-rapidapi-key": "e573b7a224msh2cb10ff25358022p1b71f1jsn0e0ef0747e4b",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        useQueryString: true,
      },
    };

    await axios
      .request(options)
      .then((response) => {
        // console.log(response.data);
        this.setState({ ...this.state.news, news: response.data });
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(this.state.news);
  };

  componentDidMount() {
    // this.getNews();
    this.get_news_from_apidojo();
  }

  render() {
    const { news } = this.state;
    if (Object.keys(news).length === 0) {
      return null;
    } else {
      // using yahoo finance low latency api
      // console.log(news);
      // const listItems = news.Content.result.map((res) => (
      //   <React.Fragment key={res.id}>
      //     <hr />
      //     <div className="card mb-3 bg-light border-light">
      //       <div className="row no-gutters">
      //         <div className="col-auto">
      //           {res.thumbnail ? (
      //             <img
      //               className="img-fluid"
      //               alt="thumbnail"
      //               src={res.thumbnail}
      //               style={{ height: "auto", width: 400 }}
      //             ></img>
      //           ) : null}
      //         </div>
      //         <div className="col">
      //           <div className="card-body px-2">
      //             <h5 className="card-title">
      //               {res.title ? (
      //                 <strong>
      //                   <a href={res.url} className="text-dark">
      //                     {he.decode(res.title)}
      //                   </a>
      //                 </strong>
      //               ) : null}
      //             </h5>

      //             {res.summary ? (
      //               <small className="mb-0">
      //                 <span className="font-italic">Summary:</span>{" "}
      //                 <ShowMoreText>{he.decode(res.summary)}</ShowMoreText>
      //               </small>
      //             ) : null}
      //             <br />
      //             <p className="card-text">
      //               {res.author_name ? (
      //                 <small className="text-muted">
      //                   Author name: {res.author_name}
      //                 </small>
      //               ) : (
      //                 <small className="text-muted">Author name: Unknown</small>
      //               )}
      //             </p>
      //             {res.provider_publish_time ? (
      //               <p className="card-text">
      //                 <small className="text-muted">
      //                   Last updated{" "}
      //                   {new Date(
      //                     res.provider_publish_time * 1000
      //                   ).toLocaleString("en-US")}
      //                 </small>
      //               </p>
      //             ) : null}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </React.Fragment>

      // using apidojo api
      // console.log(news);
      const listItems = news.items.result.map((res) => (
        <React.Fragment key={res.uuid}>
          <hr />
          <div className="card mb-3 bg-light border-light">
            <div className="row no-gutters">
              <div className="col-auto">
                {res.main_image ? (
                  <img
                    className="img-fluid"
                    alt="thumbnail"
                    src={res.main_image.original_url}
                    style={{ height: "auto", width: 400 }}
                  ></img>
                ) : null}
              </div>
              <div className="col">
                <div className="card-body px-2">
                  <h5 className="card-title">
                    {res.title ? (
                      <strong>
                        <a href={res.link} className="text-dark">
                          {he.decode(res.title)}
                        </a>
                      </strong>
                    ) : null}
                  </h5>

                  {res.summary ? (
                    <small className="mb-0">
                      <span className="font-italic">Summary:</span>{" "}
                      <ShowMoreText
                        more="SHOW MORE"
                        less="SHOW LESS"
                        anchorClass="badge badge-info"
                      >
                        {he.decode(res.summary)}
                      </ShowMoreText>
                    </small>
                  ) : null}
                  <br />
                  <p className="card-text">
                    {res.author ? (
                      <small className="text-muted">Author: {res.author}</small>
                    ) : (
                      <small className="text-muted">Author: Unknown</small>
                    )}
                  </p>
                  <p className="card-text">
                    {res.publisher ? (
                      <small className="text-muted">
                        Publisher: {res.publisher}
                      </small>
                    ) : (
                      <small className="text-muted">Publisher: Unknown</small>
                    )}
                  </p>
                  {res.published_at ? (
                    <p className="card-text">
                      <small className="text-muted">
                        Last updated{" "}
                        {new Date(res.published_at * 1000).toLocaleString(
                          "en-US"
                        )}
                      </small>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ));
      return (
        <div>
          <h5>
            Related News <i className="fas fa-newspaper"></i>
          </h5>
          {listItems}
          <hr />
        </div>
      );
    }
  }
}

export default NewsFeeds;
