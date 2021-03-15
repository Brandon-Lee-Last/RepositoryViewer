import React, { Component } from 'react'
import Loader from './Loader/Loader'

export default class Repos extends Component {
    render() {
        if(this.props.repoLoaded === true) {
            return (
                <div className="repo">
                    {this.props.data.map((data) => (
                        <div className="repo_box">
                            <h1>{data.name}</h1>
                            <p>Private Repo : {data.private}</p>
                            <p>Forks : {data.forks}</p>
                            <p>Original URL : {data.url}</p>
                            <p>Discription : {data.description}</p>
                        </div>
                    ))}
                </div> 
            )
        }
        else{
            return(
                <div className="repo_loader">
                    Please Wait...
                    <Loader/>
                </div>
            )
        }
    }
}
