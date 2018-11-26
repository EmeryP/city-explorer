import React, { Component } from 'react';
import './App.scss';
import superagent from 'superagent';

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
      JSON: '',
      formattedQuery: '',
      className: 'hide',
      WEATHER_API: '',
      weatherLogs: [],
      YELP_API: '',
      yelpLogs: [],
      MOVIES_API: '',
      moviesLogs: [],
      MEETUPS_API: '',
      meetupsLogs: [],
      TRAILS_API: '',
      trailsLogs: [],
    }
  }

  static getDerivedStateFromProps(props, state){
    console.log(state)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state);
  }

  hitWeatherApi = () => {
    superagent('get', `${this.state.WEATHER_API}`)
      .then(results => {
        this.setState({
          weatherLogs: results.body,          
        })
      })
      .catch(console.error);
  }

  hitYelpApi = () => {
    superagent('get', `${this.state.YELP_API}`)
      .then(results => {
        this.setState({
          yelpLogs: results.body,          
        })
      })
      .catch(console.error);
  }

  hitMeetupsApi = () => {
    superagent('get', `${this.state.MEETUPS_API}`)
      .then(results => {
        this.setState({
          meetupsLogs: results.body,          
        })
      })
      .catch(console.error);
  }

  hitMoviesApi = () => {
    superagent('get', `${this.state.MOVIES_API}`)
      .then(results => {
        this.setState({
          moviesLogs: results.body,          
        })
      })
      .catch(console.error);
  }

  hitTrailsApi = () => {
    superagent('get', `${this.state.TRAILS_API}`)
      .then(results => {
        this.setState({
          trailsLogs: results.body,          
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
        className: 'show',
        MAPS_API: `https://maps.googleapis.com/maps/api/staticmap?center=${results.body.latitude}%2c%20${results.body.longitude}&zoom=13&size=600x300&maptype=roadmap%20%20&key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk`,

        WEATHER_API: `https://city-explorer-backend.herokuapp.com/weather?data%5Bid%5D=${results.body.id}&data%5Bsearch_query%5D=${results.body.search_query}&data%5Bformatted_query%5D=${results.body.formatted_query}&data%5Blatitude%5D=${results.body.latitude}&data%5Blongitude%5D=${results.body.longitude}&data%5Bcreated_at%5D=`,

        YELP_API: `https://city-explorer-backend.herokuapp.com/yelp?data%5Bid%5D=${results.body.id}&data%5Bsearch_query%5D=${results.body.search_query}&data%5Bformatted_query%5D=${results.body.formatted_query}&data%5Blatitude%5D=${results.body.latitude}&data%5Blongitude%5D=${results.body.longitude}&data%5Bcreated_at%5D=`,

        MEETUPS_API: `https://city-explorer-backend.herokuapp.com/meetups?data%5Bid%5D=${results.body.id}&data%5Bsearch_query%5D=${results.body.search_query}&data%5Bformatted_query%5D=${results.body.formatted_query}&data%5Blatitude%5D=${results.body.latitude}&data%5Blongitude%5D=${results.body.longitude}&data%5Bcreated_at%5D=`,

        MOVIES_API: `https://city-explorer-backend.herokuapp.com/movies?data%5Bid%5D=${results.body.id}&data%5Bsearch_query%5D=${results.body.search_query}&data%5Bformatted_query%5D=${results.body.formatted_query}&data%5Blatitude%5D=${results.body.latitude}&data%5Blongitude%5D=${results.body.longitude}&data%5Bcreated_at%5D=`,
    
        TRAILS_API: `https://city-explorer-backend.herokuapp.com/trails?data%5Bid%5D=${results.body.id}&data%5Bsearch_query%5D=${results.body.search_query}&data%5Bformatted_query%5D=${results.body.formatted_query}&data%5Blatitude%5D=${results.body.latitude}&data%5Blongitude%5D=${results.body.longitude}&data%5Bcreated_at%5D=`
        
        })
        this.hitWeatherApi()
        this.hitYelpApi()
        this.hitMeetupsApi()
        this.hitMoviesApi()
        this.hitTrailsApi()
      })
      .catch(console.error);
  }

  render() {
    return (
      <React.Fragment>
        <header>
        <h1 id='titleTag'>City Explorer</h1>
        <p>Enter a location below to learn about the weather, events, restaurants, movies filmed there, and more!</p>
        </header>
        <form onSubmit={this.grabUrl}>
        <label>Search for a location</label>
          <input name='locationUrl' onChange={this.handleChange}/>
          <button>Explore</button>
        </form>

        <section className={this.state.className}>
          <img id='map' src={this.state.MAPS_API} alt='Maps_image'/>

          <h3>Here are your results for {this.state.formattedQuery}</h3>
          <div className='column-container'>
          <section>
          <h3>Results from the Dark Sky API</h3>
          <ul>
            {
              this.state.weatherLogs.map((record, index) => {
                return <li key={index}>The forecast for {record.time} is: {record.forecast}</li> 
              })
            }
          </ul>
          </section>

          <section>
          <h3>Results from the Yelp API</h3>
          <ul>
            {
              this.state.yelpLogs.map((record, index) => {
                return <li key={index}>
                <a href={record.url}>{record.name}</a>
                <p>The average rating is {record.rating} out of 5 and the average cost is {record.price} out of $$$$</p>
                <img src={record.image_url} alt='url img'/>
              </li> 
              })
            }
          </ul>
          </section>

          <section>
          <h3>Results from the Meetups API</h3>
          <ul>
            {
              this.state.meetupsLogs.map((record, index) => {
                return <li key={index}>
                <a href={record.link}>{record.name}</a>
                <p>Hosted by: {record.host}</p>
                <p>Created on: {record.creation_date}</p>
              </li> 
              })
            }
          </ul>
          </section>

          <section>
            <h3>Results from the Movie DB API</h3>
          <ul>
            {
              this.state.moviesLogs.map((record, index) => {
                return <li key={index}>
                <p><span>{record.title}</span> was released on {record.released_on}. Out of {record.total_votes}, {record.title} has an average vote of {record.average_votes} and a popularity score of {record.popularity}.</p>
                <img src={record.image_url} alt='url img'/>
                <p>{record.overview}</p>
              </li> 
              })
            }
          </ul>
          </section>

          <section>
          <h3>Results from the Hiking Project API</h3>
          <ul>
            {
              this.state.trailsLogs.map((record, index) => {
                return <li key={index}>
                <p>Hike Name: <a href={record.trail_url}>{record.name}</a>, Location: {record.location}, Distance: {record.length} miles</p>
                <p>On {record.condition_date} at {record.condition_time} trail conditions were reported as {record.conditions}</p>
                <p>This trail has a rating of {record.stars} stars (out of {record.star_votes} votes)</p>
                <p>{record.summary}</p>
              </li> 
              })
            }
          </ul>
          </section>
        </div>
        </section>
      </React.Fragment>
    );
  }
}

export default App;
