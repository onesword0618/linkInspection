const program = require('commander');
const undici = require('undici');
const fs = require('fs');

// main process.
async function main () {
   program.parse(process.argv);
   const text = fs.readFileSync(program.args[0], { encoding: 'utf-8' });

   const {
      statusCode
   } = await undici.request(text);

   console.log('Status: ', statusCode);
}

main();