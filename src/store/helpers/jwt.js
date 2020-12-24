/***
 * Functions related to jwt operations
 */

const jwt = require('jsonwebtoken');


// NOTE: This variable must be the **exact** same secret as the secret variable during the JWT encoding process.
// At the time of this writing, the JWT encoding process is handled in the "sessions_controller.rb" file in the backend
const secretKey = 'ThisIsASecret';

async function decryptJWT(inputHash) {

    try {
        const decoded = jwt.verify(inputHash, secretKey);
        console.log(JSON.stringify(decoded));
    } catch (err) {
        console.log(`There was an issue decoding the jwt: ${err}`);
    }
}


export { decryptJWT };
