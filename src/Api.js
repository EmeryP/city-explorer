import React from 'react';
import './App.css';
import superagent from 'superagent';


export default class Api extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      WEATHER_API: '`https://city-explorer-backend.herokuapp.com/weather?data%5Bid%5D=71&data%5Bsearch_query%5D=buffalo%20ny&data%5Bformatted_query%5D=Buffalo%2C%20NY%2C%20USA&data%5Blatitude%5D=42.886447&data%5Blongitude%5D=-78.878369&data%5Bcreated_at%5D=`',
      YELP_API: '',
      MEETUP_API: '',
      HIKING_API: ''
    }
  }

  static getDerivedStateFromProps(props, state){
    console.log(state)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state);
  }


  hitApis = event => {
    event.preventDefault();
    superagent('get', `${this.state.WEATHER_API}`)
      .then(results => {
        this.setState({
          WEATHER_API: results.text
        })
      })
  }

  render(){
    return(
      <React.Fragment>
        {/* <div>{this.state.WEATHER_API}</div>
        <form>
        <label>Search for a location</label>
          <input name='locationUrl' onChange={this.hitApis}/>
          <button>Explore</button>
        </form> */}

      </React.Fragment>
    );
  }
          
}

/* <ul>
  {
    this.state.records.map((record, index) => {
      return <li key={index}>{record.name}</li>
    })
  }
</ul> */