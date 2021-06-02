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
    updateEport,
    updateUser,
    deleteEportUser,
    removeEport,
    editUser,
    updateUserCV
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
    
    console.log("TAMBÉM CHEGOU AQUI")
    console.log("eport_create: " + JSON.stringify(eportfolio))
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: eportfolio
    };

    return fetch(`${config.apiUrl}/eportfolios`, requestOptions).then(handleResponse);
}

function updateEport(eportfolio, id_eport) {
    
    console.log("CHEGOU AQUI")
    console.log("eport_id: " + JSON.stringify(id_eport))

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: eportfolio
    };

    return fetch(`${config.apiUrl}/eportfolios/${id_eport}`, requestOptions).then(handleResponse);
}

function updateUser(user, eportfolio){

    var eports
    
    if (typeof user.eportfolios === 'undefined'){
        eports = '{"eportfolios" : [' + JSON.stringify(eportfolio) + ']}'
    }

    else {
        user['eportfolios'].push({"_id" : eportfolio.id})
        eports = '{"eportfolios" :' + JSON.stringify(user.eportfolios) + '}'
    }

    const requestOptions = {
        method: 'PUT',
        headers: special_authHeader(),
        body: eports
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function deleteEportUser(user){
    var eports
    console.log(user.eportfolios)

    user['eportfolios'].shift()
    eports = '{"eportfolios" :' + JSON.stringify(user.eportfolios) + '}'

    const requestOptions = {
        method: 'PUT',
        headers: special_authHeader(),
        body: eports
    };
    
    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function removeEport(eport){

    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/eportfolios/${eport.id}`, requestOptions).then(handleResponse);
}

function editUser(password, id){

    console.log("pass: " + password)
    console.log("id: " + id)

    const requestOptions = {
        method: 'PUT',
        headers: special_authHeader(),
        body: JSON.stringify(password)
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);

}

function updateUserCV(user, pdf){

    var cvs
    
    console.log("PDF: " + JSON.stringify(pdf))

    if (typeof user.cvs === 'undefined'){
        cvs = '{"cvs" : [' + pdf + ']}'
    }

    else {
        user['cvs'].push({"_id" : pdf.id})
        cvs = '{"cvs" :' + JSON.stringify(user.cvs) + '}'
    }

    console.log("Cvs " + cvs)

    const requestOptions = {
        method: 'PUT',
        headers: special_authHeader(),
        body: cvs
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