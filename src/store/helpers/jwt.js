/***
 * Functions related to jwt operations
 */
import Cookies from 'js-cookie';

const jwt = require('jsonwebtoken');


// NOTE: This variable must be the **exact** same secret as the secret variable during the JWT encoding process.
// At the time of this writing, the JWT encoding process is handled in the "sessions_controller.rb" file in the backend
const secretKey = 'ThisIsASecret';

/**
 * Accepts a JWT Hash and returns the decoded object.
 *
 * Returns null if the hash couldn't be decoded
 * @param jwtHash is a JWT Hash
 * @returns {Promise<null|*>}
 */
async function decryptJWT(jwtHash) {

    try {
        return jwt.verify(jwtHash, secretKey);
    } catch (err) {
        console.log(`There was an issue decoding the jwt: ${err}`);
    }
    return null;
}

/***
 * Accepts an object that contains info about the user and
 * saves them to a cookie.
 *
 * @param cookieObj contains information about the user
 */
function setCookies(cookieObj) {

    Cookies.set('id', cookieObj.id);
    Cookies.set('email', cookieObj.email);
    Cookies.set('first_name', cookieObj.email);
    Cookies.set('last_name', cookieObj.last_name);
    Cookies.set('isAdmin', cookieObj.isAdmin);

}


function clearCookies() {
    Cookies.remove('id');
    Cookies.remove('email');
    Cookies.remove('first_name');
    Cookies.remove('last_name');
    Cookies.remove('isAdmin');
}

function getUserFromCookies() {
    return {
        id: Cookies.get('id'),
        email: Cookies.get('email'),
        first_name: Cookies.get('first_name'),
        last_name: Cookies.get('last_name'),
        isAdmin: Cookies.get('is_admin'),
        isAuthenticated: true
    }
}

export { decryptJWT, setCookies, clearCookies, getUserFromCookies };
