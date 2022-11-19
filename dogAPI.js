// https://kinduff.github.io/dog-api/

const apiBaseURL = 'http://dog-api.kinduff.com';
const apiEndpoint = '/api/facts';
const apiURL = `${apiBaseURL}${apiEndpoint}?`;


// Allows non HTTPS calls
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function getDogFact(){
    const response = await fetch(apiURL + new URLSearchParams({number: 5}))
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(`Your dog fact is ${data.facts}`)
        });
    return response;
}
console.log(getDogFact());

