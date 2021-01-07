import React, { Component } from "react";
import axios from "axios";

export default class Test extends Component {
  state = {
    postId: "",
    name: "",
    body: "",
  };
  componentDidMount() {
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/comments/1")
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          name: json.name,
          body: json.body,
          postId: json.postId,
        })
      );

    // fetch("http://localhost:8000/api/getstock/")
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));

    axios
      .post("http://localhost:8000/api/getstock/", { symbol: "AMZN" })
      .then((res) => console.log(res));
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  render() {
    const { name, postId, body } = this.state;
    return (
      <div>
        <h1>Test Component</h1>
        <p>Name: {name}</p>
        <p>PostId: {postId}</p>
        <p>Body: {body}</p>
      </div>
    );
  }
}
