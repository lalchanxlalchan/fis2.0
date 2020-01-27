import db from "./Firebase";
import React from "react";
import { Route, Link } from "react-router-dom";

class ArenaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arenaArray: [],
      list: []
    };
    this.url = this.props.match.url;
  }

  async getArena() {
    var data = [];
    var snapshot = await db.collection("arena").get();
    snapshot.forEach(element => {
      data.push(element.data());
    });
    console.log(data);
    this.setState({
      arenaArray: data
    });
  }

  async componentWillMount() {
    var variable = [];
    await this.getArena();
    //console.log(this.state.arenaArray);
    this.state.arenaArray.forEach(element => {
      variable.push(element.name);
    });
    this.setState({
      list: variable
    });
  }

  render() {
    return (
      <div id="ArenaList">
        <ul>
          {this.state.arenaArray.map(arena => (
            <li key={arena.id}>
              <Link to={`${this.url}/${arena.id}`}>{arena.name}</Link>
            </li>
          ))}
          
        </ul>
      </div>
    );
  }
}

export default ArenaList;
