import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    addUser,
    getAll,
    getById,
    updateProfile,
    delete: _delete,    
    resetPassword,
   // editUser
};



function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/token/generate-token`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/list`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl1}/vendor/register`, requestOptions).then(handleResponse);
}

function addUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl1}/vendor/register`, requestOptions).then(handleResponse);
}

function updateProfile(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
 
    return fetch(`${config.apiUrl}/user/updateUser/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/deleteUser/${id}`, requestOptions).then(handleResponse);
}

function resetPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email})
    };

    return fetch(`${config.apiUrl1}/vendor/resetPassword`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        //console.log(data);
        //if (!response.ok) {
            if (data.status === 401 || data.status === 400 || !response.ok) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        //}
           // console.log(data.result);
        return data.result;
    });
}
// function editUser(id){
//     const requestOptions = {
//         method: 'GET',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         // body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/user/getUser/${id}`, requestOptions).then(handleResponse);;

// }

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/getUser/${id}`, requestOptions).then(handleResponse);
}
