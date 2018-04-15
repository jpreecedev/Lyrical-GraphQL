import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import fetchSongs from "../queries/fetchSongs";
import { Link, hashHistory } from "react-router";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [
          {
            query: fetchSongs
          }
        ]
      })
      .then(() => {
        hashHistory.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="title">Song title:</label>
          <input
            id="title"
            type="text"
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
