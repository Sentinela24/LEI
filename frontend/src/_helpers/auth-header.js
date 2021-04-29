export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    console.log("token" + user.jwt)
    if (user && user.jwt) {
        return { 'Authorization': 'Bearer ' + user.jwt };
    } else {
        return {};
    }
}