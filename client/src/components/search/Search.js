import React, { Component } from 'react'
import Autocomplete from './Autocomplete'

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.changeRoutes = this.changeRoutes.bind(this);
    }

    handleChange(e){
       this.props.handleChange(e);
    }

    changeRoutes(e){
        this.props.changeRoutes(e);
    }

    render() {
        return (
            <div>
                <div>
                    <Autocomplete changeRoutes={this.changeRoutes} users={this.props.users} input={this.props.input} isLoading={this.props.isLoading} suggestions={this.props.members} handleChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}
