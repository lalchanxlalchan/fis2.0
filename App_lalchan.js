import React from "react";
import "./App.css";
import ErrorBoundary from "./component/ErrorBoundary";
import Authentication from "./component/Authentication";
import TableOfReservation from "./component/TableOfReservation";
import AddReservation from "./component/AddReservation";
import MapContainer from "./component/MapContainer";
import SearchArena from "./component/SearchArena";
import ArenaList from "./component/ArenaList";
import { BrowserRouter } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        console.log(c.substring(name.length, c.length));
        this.setState({
          user: c.substring(name.length, c.length)
        });
      }
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.getCookie("username"), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ErrorBoundary>
            {/* <TableOfReservation arena="pkr1"></TableOfReservation>
            <MapContainer arena="pkr2"></MapContainer> */}
            <BrowserRouter>
              <ArenaList></ArenaList>
            </BrowserRouter>
          </ErrorBoundary>
        </header>
      </div>
    );
  }
}

export default App;
