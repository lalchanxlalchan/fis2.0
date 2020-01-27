import db from "./../../component/Firebase";
import React, {Fragment} from "react";
import { Route, Link } from "react-router-dom";
import TableOfReservation from './../../component/TableOfReservation';
import MapContainer from './../../component/MapContainer';

class Arena extends React.Component {
  constructor(props) {
    console.log(props.match.params.arenaId)
    super(props);
    this.state = {
      arena: []
    };
    this.url = this.props.match.url;
  }

  async getArena() {
    var data =[]
    var snapshot = await db.collection("arena").where("id","==",this.props.match.params.arenaId).get();
    //console.log(snapshot);
    snapshot.forEach(element => {
      data.push(element.data());
    });
    //console.log(data);
    this.setState({
      arena: data
    });
  }

  async componentWillMount() {
    var variable = [];
    await this.getArena();
    console.log(this.state.arena);
  }

  render() {
    return (
      <div id="Arena">
        <Fragment>
        <TableOfReservation arena={this.props.match.params.arenaId}></TableOfReservation>
        <MapContainer arena = {this.props.match.params.arenaId}></MapContainer>
    </Fragment>
      </div>
    );
  }
}

export default Arena;
