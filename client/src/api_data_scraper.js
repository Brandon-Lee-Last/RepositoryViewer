import {Github_Token} from './config'
let count = 0
let id = 0;

//fetching github users and then storing them in this server.
export async function fetchUsers(name) {
    fetch(`https://api.github.com/users/${name}?access_token=${Github_Token}`)
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        //Storing in express server
            fetch(`/api/add/github/${data.id}/${data.login}/${data.username}/${data.bio}/${data.followers}/${data.following}/${data.avatar_url}`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json',
                'Access-Controll-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                },
                body: JSON.stringify(data),//returns json body format.
            }).then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

            })
            .catch(error => {
                console.log(error);
            });
})
.catch(error => {
        console.error('There was an error!', error);
});

}

export function getGitLabUsers(name){
    count = 0;
    if(name !== null){
        try{
            fetch(`https://gitlab.com/api/v4/users/?username=${name}`,
                Headers = {
                    'Authorization': "Bearer" + "BETtbMWkUvdRQjdDoSPX",
                    headers: {'Content-Type': 'application/json','Accept': 'application/json',},
                }
            ).then(res => res.json()).then((data) => {
                if(data[0] !== undefined){
                    id = data[0].id;
                    fetch(`https://gitlab.com/api/v4/users/${id}`,{

                    }).then(res => res.json()).then((_data) => {
                        count++;
                        if(count < 3){
                            fetch(`/api/add/gitlab/${id}/${_data.name}/${_data.username}/${_data.bio}/${_data.following}/${_data.followers}/${_data.avatar_url}`,
                            {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                mode: 'no-cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: {
                                'Content-Type': 'application/json',
                                'Access-Controll-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type',
                                'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                                },
                                body: JSON.stringify(data),//returns json body format.
                            }).then(res => res.json());
                        }
                    })
                }
                else {
                    fetch(`/api/add/gitlab/-1/undefined/undefined/undefined/undefined/undefined/undefined`,
                    {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json','Accept': 'application/json',},
                        body: JSON.stringify(data),//returns json body format.
                    }
                    ).then(res => res.json());
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }
}
export function fetchUserDetails(id){
            
    fetch(`https://api.github.com/user/${id}/repos?access_token=${Github_Token}`).then(res => res.json()).then((data) => {
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            fetch(`https://api.github.com/repos/${data[i].owner.login}/${data[i].name}/commits?access_token=${Github_Token}`).then(res => res.json()).then((_data) => {
                fetch(`/api/add/details/${data[i].owner.id}/${data[i].id}/${data[i].name}/${data[i].description}/${data[i].created_at}/${data[i].forks}/${data[i].license }/${data[i].private}/${data[i].url}`,
                {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json',
                'Access-Controll-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                },
                body: JSON.stringify(data),//returns json body format.
            }).then(res => res.json());
            })
        }

    })
}