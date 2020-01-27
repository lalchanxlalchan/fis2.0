import db from "./Firebase";
import React from "react";

class SearchArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      arenaArray: []
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.search = this.search.bind(this);
  }

  async getArena(query) {
    var data = [];
    var snapshot = await db
      .collection("arena")
      .orderBy("name")
      .startAt(query)
      .endAt(query + "\uf8ff")
      .get();
    snapshot.forEach(element => {
      data.push(element.data());
    });
    console.log(data);
    this.setState({
      arenaArray: data
    });
  }

  updateQuery(param) {
    this.setState({
      query: param.target.value
    });
  }
  search(param) {
    param.preventDefault();
    this.getArena(this.state.query);
  }

  render() {
    return (
      <div id="searchDiv">
        <h1>Search Arena</h1>

        <input
          type="text"
          value={this.state.query}
          onChange={this.updateQuery}
        />
        <br />
        <button onClick={this.search}>Search</button>
      </div>
    );
  }
}

export default SearchArena;
