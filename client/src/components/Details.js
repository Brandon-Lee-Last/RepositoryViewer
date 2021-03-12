import React from 'react'

export default function Details() {
    return (
        <div className="details">
        <h1>DEPENDENCIES</h1>
        <div className="img_border">
        <img className="depend_img" src="http://pngimg.com/uploads/github/github_PNG40.png"></img>
        </div>
        <div className="img_border">
        <img className="depend_img" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/144_Gitlab_logo_logos-512.png"></img>
        </div>
        <p>This Application Depends on Github and Gitlabs API, if erros occur it may likely be due to the fact that their servers are down or the application Token has reached its user endpoint limit.</p>
            
        </div>
    )
}
