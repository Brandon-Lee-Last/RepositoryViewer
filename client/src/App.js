import React, { Component } from 'react'
import Search from './components/search/Search'
import Details from './components/Details'
import Users from './components/Users'
import {fetchUsers, getGitLabUsers} from './api_data_scraper'
import './App.css'
import './style.css'
import './type_writer.css'
import TypeWriter from './components/TypeWriter'

//Imports for routing.
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: null,
      isLoading: false, 
      members: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {//Checxks if the state updated and then recalls the api to feed it more members in the autocomplete list.
      this.setState({isLoading: true});
      setTimeout(() => {
      fetch(`/api/fetch/users`)
      .then(async response => {
        const data = await response.json();
  
        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
  
        this.setState({users: data, isLoading: false});
      })
      .then(() => {

          let new_members_array = [];
          for (let i = 0; i < 2; i++) {
            new_members_array.push(this.state.users[i].name)
          }
          this.setState({members:new_members_array});
          this.forceUpdate();//Forces a render.

      })
      .catch(error => {
        console.error('There was an error!', error);
      });
      
      }, 1000)
    }
  }

  handleChange(e) {
    setTimeout(() => {
      this.setState({name: e});
    }, 600)//sets the state name afetr 0.6 seconds.
    fetchUsers(e);
    getGitLabUsers(e);
  }

  render() {
    return (
      <Router>
          <Switch>
            <Route path="/users/:type/:id" exact component={Users}/>
            <Route path="/">
            <div>
          <div className="header">
            <TypeWriter/>
            <Search changeRoutes={this.changeRoutes} users={this.state.users} input={this.state.name} members = {this.state.members} handleChange={this.handleChange} isLoading={this.state.isLoading}/>
          </div>
          <div>
            <Details/>
          </div>
          </div>
            </Route>
        </Switch>
      </Router>
    )
  }
}

