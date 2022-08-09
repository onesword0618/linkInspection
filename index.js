const undici = require('undici');

// main process.
async function main () {
 const {
  statusCode
 } = await undici.request('https://www.google.com/');

 console.log('Status: ', statusCode)
}

main();