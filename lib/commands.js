'use strict';

var fs = require('fs');

module.exports.pwd = function(){
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  process.stdout.write(process.cwd());
  cb();
};

module.exports.date = function(){
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  process.stdout.write(new Date().toString());
  cb();
};

module.exports.ls = function(){
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
    })
    cb();
  });
};

module.exports.echo = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  process.stdout.write([].slice.call(arguments, 0, -1).join(' '));
  cb();
};

module.exports.cat = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);

  fs.readFile(args[0], {encoding: 'utf8'}, function(err, data) {
    if (err) throw err;
    process.stdout.write(data);
    cb();
  });
};

module.exports.head = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  const lines = args[1] || 10;
  let output;

  fs.readFile(args[0], {encoding: 'utf8'}, function(err, data) {
    if (err) throw err;
    output = data.split('\n').slice(0, lines).join('\n');
    process.stdout.write(output);
    cb();
  });
};

module.exports.tail = function(){
    const cb = arguments[arguments.length - 1]; // Last argument is the callback
    const args = [].slice.call(arguments, 0, -1);
    let lines = args[1] || 10;
    let output;

    fs.readFile(args[0], {encoding: 'utf8'}, function(err, data) {
      if (err) throw err;
      const docLines = data.split('\n');
      lines = lines < docLines.length ? lines : docLines.length;
      output = docLines.slice(-lines).join('\n');
      process.stdout.write(output);
      cb();
    });
  };


module.exports.sort = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);


  fs.readFile(args[0], {encoding: 'utf8'}, function(err, data) {
    if (err) throw err;
    let output = data.split('\n');

    if (output[output.length-1] === '') {
      output.pop();
    }

    output = output.sort(function(a,b){
      let aReduced = a.replace(/[^A-Za-z]/g, '');
      let bReduced = b.replace(/[^A-Za-z]/g,'')
      return aReduced < bReduced ? -1 : (aReduced > bReduced ? 1 : 0);
    }).join('\n');

    process.stdout.write(output);
    cb();
  });
};

module.exports.wc = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  let output;

  fs.readFile(args[0], {encoding: 'utf8'}, function(err, data) {
    if (err) throw err;
    output = data.split('\n')

    if (output[output.length-1] === '') {
      output = output.length-1;
    } else {
      output = output.length;
    }

    process.stdout.write(output.toString());
    cb();
  });
};

module.exports.uniq = function() {
  

}
