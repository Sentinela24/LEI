import config from 'config';
import { authHeader } from '../_helpers';
import { special_authHeader } from '../_helpers/special_auth-header';
import { users } from '../_store/users.module';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    create_eport,
    updateUser
};

function login(identifier, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
    };

    return fetch(`${config.apiUrl}/auth/local`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.jwt) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/auth/local/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function create_eport(eportfolio) {
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: eportfolio
    };

    return fetch(`${config.apiUrl}/eportfolios`, requestOptions).then(handleResponse);
}

function updateUser(user, eportfolio){
    console.log("id: " + JSON.stringify(user))
    //console.log("eportfolio: " + eportfolio.id);

    //console.log("eport" + eportfolio.id)

    var eports
    
    if (typeof user.eportfolios === 'undefined'){
        //console.log(JSON.stringify(eportfolio))
        console.log("bbbbbbbbbbbbbbb" + user.eportfolios)

        eports = '{"eportfolios" : [' + JSON.stringify(eportfolio) + ']}'

    }
    else {
        console.log("aaaaaaaaaaaaaaaaa" + JSON.stringify(user.eportfolios))

        user['eportfolios'].push({"_id" : eportfolio.id})

        eports = '{"eportfolios" :' + JSON.stringify(user.eportfolios) + '}'

    }


    console.log("eports: " + eports)

    const requestOptions = {
        method: 'PUT',
        headers: special_authHeader(),
        body: eports
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}