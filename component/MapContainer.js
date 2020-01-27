import React from 'react';
import db from './Firebase'
import { func } from 'prop-types';
//import { Map, GoogleApiWrapper } from 'google-maps-react';


//const mapStyles = {
  //  width: '100%',
  //  height: '100%',
  //  padding: '0px',
      
  //};

  
class MapContainer extends React.Component {



  constructor(props) {
    super(props);
    
    this.state = {
      arena: this.props.arena,
    };
  }

  componentDidMount(){
    this.getSrc()    
  }
  
  async getSrc(){
    const querySnapShot=await db.collection('arena').where('id','==',this.props.arena).get();
    querySnapShot.forEach(element => {
      console.log(element.data().mapSrc)
      this.setState({
        src:element.data().mapSrc
      })
    });
  }

  render(){
    return (
      <div id="map">
        <h1>Map</h1>
        <iframe src={this.state.src} width="600 px" height="450 px" frameBorder="0" allowFullScreen=""></iframe>
      </div>  
    );
    }
}
  
export default MapContainer;