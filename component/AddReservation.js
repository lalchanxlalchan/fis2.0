import db from "./Firebase";
import React from "react";
class AddReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserver: "",
      location: "",
      dateAndTime: new Date(),
      cost: 1000,
      confirmation: false
    };
    this.updateForm = this.updateForm.bind(this);
    this.addReservation = this.addReservation.bind(this);
  }
  async addReservation(param) {
    param.preventDefault();
    var deadline = new Date();
    var date = new Date();
    deadline.setTime(date.getTime() + 30 * 60 * 1000);
    date = new Date(this.state.dateAndTime);
    await db.collection("reservations").add({
      reservedBy: this.state.reserver,
      reservedAt: this.state.location,
      reservedFor: date.toUTCString(),
      price: this.state.cost,
      confirmation: this.state.confirmation,
      confirmationDeadline: deadline //current date and time + 45 mins default
    });

    console.log("Added Succesfully");
  }
  updateForm(param) {
    this.setState({
      [param.target.id]: param.target.value
    });
    console.log(param.target.value);
  }

  render() {
    return (
      <div id="reservation">
        <h1>Add Reservation</h1>
        <form id="reservationForm">
          <input
            type="text"
            id="reserver"
            name="reservedBy"
            placeholder="Reserver"
            value={this.reserver}
            onChange={this.updateForm}
          />
          <br />
          <input
            type="text"
            id="location"
            name="reservedAt"
            placeholder="Location"
            value={this.location}
            onChange={this.updateForm}
          />
          <br />
          <input
            type="datetime-local"
            id="dateAndTime"
            name="reservedFor"
            value={this.dateAndTime}
            onChange={this.updateForm}
          />
          <br />
          <input
            type="number"
            id="cost"
            name="price"
            placeholder="Price"
            value={this.price}
            onChange={this.updateForm}
          />
          <br />
          <input
            type="checkbox"
            id="bool"
            name="confirmation"
            value={this.confirmation}
            onChange={this.updateForm}
          />
          <br />
          <button onClick={this.addReservation}>AddReservation</button>
        </form>
      </div>
    );
  }
}

export default AddReservation;
