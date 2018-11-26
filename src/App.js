import React, { Component } from 'react';
import './App.css';
import superagent from 'superagent';
// import Api from './Api.js'

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      API_URL: `https://city-explorer-backend.herokuapp.com`,
      LOCATION_API: `https://city-explorer-backend.herokuapp.com/location?data=`,
      MAPS_API: '',
      locationUrl: '',
      latitude: 0,
      longitude: 0,
      records: [],
      JSON: '',
      formattedQuery: '',
      WEATHER_API: '',
      weatherLogs: []
    }
  }

  static getDerivedStateFromProps(props, state){
    console.log(state)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state);
  }

  hitApis = () => {
    superagent('get', `${this.state.WEATHER_API}`)
      .then(results => {
        this.setState({
          weatherLogs: results.text,
          records: results.body,
          
        })
      })
      .catch(console.error);
  }

  grabUrl = event => {
    event.preventDefault();
    superagent('get', `${this.state.LOCATION_API}/${this.state.locationUrl}`)
      .then(results => {
        this.setState({
        latitude: results.body.latitude,
        longitude: results.body.longitude,
        JSON: results.text,
        formattedQuery: results.body.formatted_query,
        MAPS_API: `https://maps.googleapis.com/maps/api/staticmap?center=${results.body.latitude}%2c%20${results.body.longitude}&zoom=13&size=600x300&maptype=roadmap%20%20&key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk`,
        WEATHER_API: `https://city-explorer-backend.herokuapp.com/weather?data%5Bid%5D=${results.body.id}&data%5Bsearch_query%5D=${results.body.search_query}&data%5Bformatted_query%5D=${results.body.formatted_query}&data%5Blatitude%5D=${results.body.latitude}&data%5Blongitude%5D=${results.body.longitude}&data%5Bcreated_at%5D=`
        
        })
        this.hitApis()
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

          <h3>Here are your results for {this.state.formattedQuery}</h3>
          <section className='column-container'>
          <ul>
            {
              this.state.records.map((record, index) => {
                return <li key={index}>The forecast for {record.time} is: {record.forecast}</li> 
              })
            }
          </ul>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default App;
