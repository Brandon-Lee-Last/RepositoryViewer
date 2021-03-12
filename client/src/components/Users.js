import React, { Component } from 'react'
import {Github_Token, GitLab_Token } from '../config'
import Loader from './Loader/Loader'
import {fetchUserDetails} from '../api_data_scraper'
import Repos from '../components/Repos'

export default class Users extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            data: [],
            repoLoaded: false
        }
    }


    componentDidMount(){
        let Type = window.location.pathname.substring(7, 13);
        let id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        if(Type === "GITHUB"){

            fetch(`https://api.github.com/user/${id}?access_token=${Github_Token}`).then(res => res.json()).then((data) => {
                this.setState({user: data});
            }).then(() => {
                fetchUserDetails(id);
                fetch(`/api/fetch/repo`).then(res => res.json()).then((_data) => {
                    this.setState({data: _data});
                })
                .then(() => {
                    setTimeout(() => {
                        this.setState({isLoading: false});
                    }, 1000);
                })   
            })
        }
        else{
            this.setState({isLoading: true});
            fetch(`https://gitlab.com/api/v4/users/${id}`).then(res => res.json()).then((data) => {
                this.setState({user: data});
            }).then(() => {
                this.setState({isLoading: false});
            })

        }

    }


    componentDidUpdate(prevProps, prevState){
        if(prevState.data !== this.state.data){
            this.setState({repoLoaded: false});
            fetch(`/api/fetch/repo`).then(res => res.json()).then((_data) => {
                this.setState({data: _data});
            })
            .then(() => {
                this.setState({repoLoaded: true});
            }) 
        }
    }
    

    render() {
        if(this.state.isLoading === false && this.state.user !== null){
            return(
                <div className="user_page">
                        <div className="inner_page">
                        <h1>{this.state.user.name}</h1>
                        <img src={this.state.user.avatar_url}></img>
                        <p>{this.state.user.bio}</p>
                        <p>Followers : {this.state.user.followers}</p> <p>Following : {this.state.user.following}</p>
                        <h1 className="projects_h1">Projects</h1>
                        <Repos data={this.state.data} repoLoaded = {this.state.repoLoaded}/>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Loader/>
                </div>
            )
        }
    }
}
