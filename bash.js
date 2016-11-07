'usen strict';

var command = require('./lib/commands');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  const args = data.toString().trim().split(/\s+/g); // remove the newline
  const cmd  = args.shift();
  const cb = function(result) {
    process.stdout.write(result);
    process.stdout.write('\nprompt > ');
  };

  if(command[cmd]){ command[cmd].apply(undefined, args.concat([cb])); }
  else{
    process.stdout.write('cmd doesn\'t exist');
    cb();
  }
});
