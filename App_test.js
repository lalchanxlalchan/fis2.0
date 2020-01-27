import React from 'react';
import './App.css';
import ErrorBoundary from './component/ErrorBoundary';
import Authentication from './component/Authentication';
import TableOfReservation from './component/TableOfReservation';
import AddReservation from './component/AddReservation';
import GetReservation from './component/GetReservation';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  componentDidCatch(){
    console.log("Component Did Catch")
  }

  componentDidMount(){
    console.log("Component Did Mount")
  }

  componentDidUpdate(){
    console.log("Component Did Update")
  }

  componentWillMount(){
    console.log("Component will Mount")
  }

  componentWillUpdate(){
    console.log("Component will Update")
  }

  componentWillUnmount(){
    console.log("Component will Unmount")
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <ErrorBoundary>
              <p>
                Hello
              </p>
          </ErrorBoundary>
        </header>
        
      </div>
    );
  }
}

export default App;
