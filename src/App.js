import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import superagent from 'superagent';

class App extends Component {

  constructor(props){
    super(props);
    
    // let locationUrl;
    this.state = {
      API_URL: `https://city-explorer-backend.herokuapp.com/location?data=`,
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
        JSON: results.text
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.grabUrl}>
          <input name='locationUrl' onChange={this.handleChange}/>
          <button>Go</button>
        </form>
        <section>
          {this.state.JSON}
        </section>
        <section>
          <h2>Results</h2>
          {/* { <ul>
            {
              this.state.records.map((record, index) => {
                return <li key={index}>{record.name}</li>
              })
            }
          </ul> } */}
        </section>
      </React.Fragment>
    );
  }
}

export default App;
