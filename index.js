const program = require('commander');
const undici = require('undici');
const fs = require('fs');
const readline = require('readline');

// main process.
async function main() {
  program.parse(process.argv);
  const reader = readline.createInterface({
    input: fs.createReadStream(program.args[0], { encoding: 'utf-8' })
  });
  const output = fs.createWriteStream(program.args[1], { encoding: 'utf-8' });
  let links = 0;
  for await(const current of reader) {
    await undici.request(current).catch(response => {
      if (response.statusCode !== 200) {
        output.write(current + ' is dead.' + '\n');
        links++;
      }
    });
  };
  output.close();
  reader.close();
  if(links === 0) {
    fs.unlinkSync(program.args[1]);
  };
  console.log('fin.');
  // TODO endless process ...
  process.exit(0);
}

main();