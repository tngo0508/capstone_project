import React, { Component } from "react";

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
