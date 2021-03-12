import React, { Component, Fragment } from "react";
import './autocomplete.css'
import Loader from '../Loader/Loader'
import {Link} from 'react-router-dom'

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
  
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  componentDidUpdate(prevProps, prevState){
    if(prevProps.suggestions !== this.props.suggestions){
      const { suggestions } = this.props;
      const userInput = this.props.input;
      const filteredSuggestions = suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: this.props.input
      });
    }
  }

  onKeyUp = e => {
    this.props.handleChange(e.target.value);
    const { activeSuggestion, filteredSuggestions } = this.state;
  
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {

    const {
      onChange,
      onKeyDown,
      onKeyUp,
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    
  
    let suggestionsListComponent;

    if(this.props.isLoading === true) {
      document.querySelector('input').disabled = true;
    }
    else{
      let input = document.querySelector('input');
      if(input !== undefined && input !== null){
        input.focus();
        input.disabled = false;
      }
    }

    if (showSuggestions && userInput) {
      if(this.props.isLoading === false) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                
                  return (
                    <div key={suggestion}>
                      {this.props.users.map((user) => (
                        <div key={user.id}>
                            <Link to={`/users/${user.type}/${user.id}`}>
                              <div className="suggestion-box" onClick={this.onClick} key={user.id}>
                                <img src={user.imageURL}></img>
                                <p>{user.name}</p>
                              </div>
                          </Link>
                         </div>
                      ))}
                    </div>
                  );
              })}
            </ul>
  
          );
        } else {
          suggestionsListComponent = (
            <div className="no-suggestions">
              <em>No suggestions available.</em>
            </div>
          );
        }
      }
      else{
        suggestionsListComponent = (
          <div className="no-suggestions">
            <div className="loader-no-suggestions">
            <Loader/>
            </div>
          </div>
        );
      }
    }
    return (
      <Fragment>
        <input
          id="text"
          autoComplete="off"
          placeholder="Search here"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          onKeyUp={onKeyUp}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;