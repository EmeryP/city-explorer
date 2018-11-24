import React, { Component } from 'react';
import './App.css';
import superagent from 'superagent';

class App extends Component {

  constructor(props){
    super(props);
    
    // let locationUrl;
    this.state = {
      API_URL: `https://city-explorer-backend.herokuapp.com/location?data=`,
      MAPS_API: '',
      locationUrl: '',
      latitude: 0,
      longitude: 0,
      records: [],
      JSON: ''
    }
  }

  static getDerivedStateFromProps(props, state){
    console.log(state)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state);
  }

  grabUrl = event => {
    event.preventDefault();
    superagent('get', `${this.state.API_URL}/${this.state.locationUrl}`)
      .then(results => {
        this.setState({
        latitude: results.body.latitude,
        longitude: results.body.longitude,
        records: results.body.results,
        JSON: results.text,
        MAPS_API: `https://maps.googleapis.com/maps/api/staticmap?center=${results.body.latitude}%2c%20${results.body.longitude}&zoom=13&size=600x300&maptype=roadmap%20%20&key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk`

        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <React.Fragment>
        <h1 id='titleTag'>City Explorer</h1>
        <p>Enter a location below to learn about the weather, events, restaurants, movies filmed there, and more!</p>
        <form onSubmit={this.grabUrl}>
        <label>Search for a location</label>
          <input name='locationUrl' onChange={this.handleChange}/>
          <button>Explore</button>
        </form>
        <section>
          <img id='map' src={this.state.MAPS_API} alt='Maps_image'/>
          <h3>Here are your results for {this.state.locationUrl}</h3>
          
          {/* <ul> */}
            {/* {
              this.state.records.map((record, index) => {
                return <li key={index}>{record.name}</li>
              })
            } */}
          {/* </ul> */}
        </section>
      </React.Fragment>
    );
  }
}

export default App;
