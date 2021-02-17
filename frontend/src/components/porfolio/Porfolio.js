import React, { useState, useEffect } from "react";
import { Spinner, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { db } from "../auth/firebase";
import { MDBIcon } from "mdbreact";
import TextInputGroup from "../layout/TextInputGroup";
import _ from "lodash";
import DeerParticles from "../layout/DeerParticles";
import { MDBJumbotron, MDBContainer } from "mdbreact";
import { MDBTypography, MDBBox } from "mdbreact";

export default function Porfolio() {
  const [stocks, setstocks] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [symbolName, setSymbolName] = useState("");
  const [fund, setFund] = useState(0);
  const [error, setError] = useState({});
  const id = currentUser.uid;

  const ref = db.collection("porfolio").doc(id);

  useEffect(() => {
    const ref = db.collection("porfolio").doc(id);
    // console.log(ref);
    const getStocksFromDB = () => {
      setLoading(true);
      ref.onSnapshot((doc) => {
        // console.log(doc.exists);
        if (doc.exists) {
          setstocks(doc.data());
        }
        setLoading(false);
      });
    };

    getStocksFromDB();
    return () => getStocksFromDB();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const getTotal = () => {
    if (!_.isEmpty(stocks)) {
      // console.log(stocks);
      const total = Object.values(stocks).reduce(
        (a, b) => parseFloat(a) + parseFloat(b)
      );
      return total;
    }
    return 0;
  };

  const onChangeSymbol = (e) => setSymbolName(e.target.value);
  const onChangeFund = (e) => setFund(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (symbolName === "") {
      setError({ symbol: "This field is required." });
      setLoading(false);
      return;
    }

    if (stocks) {
      stocks[symbolName] = parseFloat(fund, 10).toFixed(2);
      ref.set(stocks).catch((err) => console.error(err));
    } else {
      const newStock = {};
      newStock[symbolName] = fund;
      ref.set(newStock).catch((err) => console.error(err));
    }

    // clear state after submitting form
    setSymbolName("");
    setFund(0);
    setError("");
  };

  const deleteStock = (key) => {
    delete stocks[key];
    // console.log(stocks);
    ref.set(stocks).catch((err) => console.error(err));
    if (_.isEmpty(stocks)) {
      db.collection("porfolio")
        .doc(id)
        .delete()
        .then(() => {
          // console.log("Document successfully deleted!");
        })
        .catch((err) => console.error("Error removing document: ", err));
    }
  };

  return (
    <div className="m-5">
      <MDBJumbotron fluid>
        <MDBContainer>
          <h1 className="display-5">Welcome, {currentUser.email}</h1>
          <p className="lead">
            Please use the <strong>Investment Management</strong> box and follow
            the instructions below to manage your investment.
          </p>
          <MDBTypography blockquote bqColor="success">
            <>
              <MDBBox tag="p" mb={0} className="bq-title">
                <>To add a new investment</>
              </MDBBox>
              <p>
                Start typing the company name and the fund on the two fields.
                Then, click on the <strong>ADD/UPDATE</strong> button.
              </p>
            </>
          </MDBTypography>
          <MDBTypography blockquote bqColor="warning">
            <>
              <MDBBox tag="p" mb={0} className="bq-title">
                <>To edit an investment</>
              </MDBBox>
              <p>
                Start typing the name of the company that you want to update and
                the amount of new fund. Then, click on the{" "}
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
                Look through the list of investment on the right side. Choose
                the brand/company that you want to remove from your list. Then,
                click <strong>DELETE</strong> button
              </p>
            </>
          </MDBTypography>
        </MDBContainer>
      </MDBJumbotron>
      <div className="row">
        <div className="col-md-6">
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
        <div className="col-md-6">
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
                    <div className="row">
                      <div className="d-flex col-sm-8 align-items-center">
                        <span className="col-md-1">{idx + 1}</span>
                        <span className="col-md-5">{key} </span>
                        <span className="col-md-5">$ {stocks[key]}</span>
                      </div>
                      <div className="d-flex ]ol-sm-4">
                        <div className="btn-group float-right">
                          <button
                            onClick={() => deleteStock(key)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
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
      <DeerParticles />
    </div>
  );
}
