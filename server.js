const express = require('express');
const port = process.env.PORT || 5000;
const helmet = require('helmet');
const fs = require('fs');//File System Reader Writer ect.

const app = express();
app.use(helmet());//Hides headers from attackers and adds security.

function getUser(){
    try{
        const content = fs.readFileSync('users.json');
        return JSON.parse(content);//parses the data into JSON format.
    }
    catch(e){
        fs.writeFileSync('users.json', '[]')//creates a json array.
        return [];//returns the array.
    }
}

function getRepo(){
    try{
        const content = fs.readFileSync('repo.json');
        return JSON.parse(content);//parses the data into JSON format.
    }
    catch(e){
        fs.writeFileSync('repo.json', '[]')//creates a json array.
        return [];//returns the array.
    }
}
//Adds repo det[ails to its own file.]
function addDetails(user_id, id, name, description, created, forks, license, private, url){
    let repo = getRepo();
    console.log(id);
    for (let i = 0; i < repo.length; i++) {
        if(repo[i].id === id){
            console.log('Duplicate found, deleting repo with id of ' + id);
            repo.splice(i, 1);
        }

        if(repo[i].userID !== user_id){
            repo = [];
            i = repo.length;
            console.log('Deleted File');
        }
        
    }

    //If there are no projects file is emtpy.
    repo.push({"userID": user_id, "id":id, "name": name, "description": description, "created": created, "forks": forks, "license": license, "private": private, "url": url});
    fs.writeFileSync('repo.json', JSON.stringify(repo));//Rewrites the json array.
}

//-----------------------------------------GITHUB-----------------------------------------//

//Function that adds users.
function AddUser(id, name, username, bio, following, followers, imageURL, type){
    let user = getUser();
    for (let i = 0; i < user.length; i++) {
        if(user[i].type === type){
            console.log('Duplicate found, deleting user');
            user.splice(i, 1);
        }
        
    }
    user.push({"type": type, "id":id, "name": name, "username": username, "bio": bio, "following": following, "followers": followers ,"imageURL": imageURL});
    fs.writeFileSync('users.json', JSON.stringify(user));//Rewrites the json array.
}


//Post GitHub user to the database.
app.post('/api/add/github/:id/:name/:repos/:bio/:following/:followers/*', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const repos = req.params.repos;
    const bio = req.params.bio;
    const following = req.params.following;
    const followers = req.params.followers;
    const imageURL = req.params[0];

    try{
        AddUser(id, name, repos, bio, following, followers, imageURL, "GITHUB");
        res.send("Successfully added!");
        console.log("Successfully added")
    }
    catch(e){
        res.send('Error: ' + e.message)
        console.log("Error: " + e.message)
    }
})

//-----------------------------------------GITLAB-----------------------------------------//
//Post GitLab user to the database.
app.post('/api/add/gitlab/:id/:name/:username/:bio/:following/:followers/*', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const username = req.params.username;
    const bio = req.params.bio;
    const following = req.params.following;
    const followers = req.params.followers;
    const imageURL = req.params[0];

    try{
        if(id !== "-1"){
            if(id !== "-1"){
                AddUser(id, name, username, bio, following, followers, imageURL, "GITLAB");
                res.send("Successfully added!");
                console.log("Successfully added")
            }
        }
    }
    catch(e){
        res.send('Error: ' + e.message)
        console.log("Error: " + e.message)
    }
})

//-----------------------------------------Post User Details-----------------------------------------//

//Posts repo details.
app.post('/api/add/details/:user_id/:id/:name/:description/:created/:forks/:license/:private/*', (req, res) => {
    const user_id = req.params.user_id;
    const id = req.params.id;
    const name = req.params.name;
    const description = req.params.description;
    const created = req.params.created;
    const forks = req.params.forks;
    const license = req.params.license;
    const private = req.params.private;
    const url = req.params[0];

    try{
        addDetails(user_id, id, name, description, created, forks, license, private, url);
        res.send("Successfully added!");
        console.log("Successfully added")
    }
    catch(e){
        res.send('Error: ' + e.message)
        console.log("Error: " + e.message)
    }
})

if (process.env.NODE_ENV === 'development') {
    server.use(express.static('client/build')); 
    server.use('*', express.static('client/build')); // Added this     
  }

app.get('/api/fetch/users', (req, res) => {
    res.send(getUser());
})

app.get('/api/fetch/repo', (req, res) => {
    setTimeout(() => {
        res.send(getRepo());
    },1000);
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})