import React from "react";
import firebase from "firebase";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import db from "./Firebase";

class TableOfReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arena: this.props.arena
    };
    this.table = [];
    this.columns = [
      { dataField: "Time", text: "Time" },
      { dataField: "Status", text: "Status" },
      { dataField: "ReservedBy", text: "Reserved By" }
    ];
  }

  async byArena(arena) {
    var data = [];
    var snapshot = await db
      .collection("reservations")
      .where("reservedAt", "==", arena)
      .get();
    snapshot.forEach(element => {
      data.push(element.data());
    });
    return data;
  }

  async byDateAndTime(_DAT) {
    var data = [];
    var snapshot = await db
      .collection("reservations")
      .where("reservedFor", "==", _DAT)
      .get();
    snapshot.forEach(element => {
      data.push(element.data());
    });
    return data;
  }

  async isReserved(arena, _DAT) {
    this.setState({
      statusbool: false
    });

    var snapshot = await db
      .collection("reservations")
      .where("reservedAt", "==", arena)
      .get();
    snapshot.forEach(element => {
      if (element.data().reservedFor === _DAT) {
        this.setState({
          statusbool: true
        });
      }
    });
  }

  async getReserver(arena, _DAT) {
    var newEmail = "";
    var name = "";

    var snapshot = await db
      .collection("reservations")
      .where("reservedFor", "==", _DAT)
      .get();
    snapshot.forEach(element => {
      if (element.data().reservedAt === arena) {
        newEmail = element.data().reservedBy;
      }
    });
    var snapshot = await db
      .collection("extraUserInfo")
      .where("email", "==", newEmail)
      .get();
    snapshot.forEach(element => {
      name = element.data().name;
    });
    this.setState({
      reserver: name
    });
  }

  _AMPMMaker(hour) {
    if (hour > 12) {
      return String(hour - 12) + ":00 pm";
    } else if (hour === 12) {
      return "12:00 pm";
    }
    return String(hour) + ":00 am";
  }

  async createTableForArena() {
    var date = new Date();
    date.setHours(0, 0, 0);

    for (let index = 6; index < 20; index++) {
      date.setHours(index);
      const timestamp = this._AMPMMaker(index);
      await this.isReserved(this.state.arena, date.toUTCString());
      let status;
      if (this.state.statusbool) {
        status = (
          <input
            type="checkbox"
            id={String(index)}
            name={"cb" + String(index)}
            checked
          />
        );
      } else {
        status = (
          <input
            type="checkbox"
            id={String(index)}
            name={"cb" + String(index)}
          />
        );
      }
      await this.getReserver(this.state.arena, date.toUTCString());
      this.table = this.table.concat([
        { Time: timestamp, Status: status, ReservedBy: this.state.reserver }
      ]);
    }
  }
  componentWillMount() {
    this.createTableForArena();
  }

  render() {
    return (
      <div id="table">
        <h1>Table of Reservation for {this.state.arena}</h1>
        <BootstrapTable
          keyField="Time"
          bordered={true}
          data={this.table}
          columns={this.columns}
        ></BootstrapTable>
      </div>
    );
  }
}
export default TableOfReservation;
