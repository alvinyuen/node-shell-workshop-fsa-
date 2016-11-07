'use strict';

var fs = require('fs');
var request = require('request');

module.exports.pwd = function pwd(){
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  cb(process.cwd());
};

module.exports.date = function date(){
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  cb(new Date().toString());
};

module.exports.echo = function echo() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  cb([].slice.call(arguments, 0, -1).join(' '));
};

/* Async Commands */
module.exports.ls = function ls(){
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    cb(files.reduce(function(prev, file) {
      return prev + file.toString() + "\n";
    }));
  });
};

module.exports.cat = function cat() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);

  fs.readFile(args[0], {encoding: 'utf8'}, function(err, data) {
    if (err) throw err;
    cb(data);
  });
};

module.exports.head = function head() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  const lines = args[1] || 10;

  module.exports.cat.apply(undefined, args.concat([function(data) {
    cb(data.split('\n').slice(0, lines).join('\n'));
  }]));
};

module.exports.tail = function(){
    const cb = arguments[arguments.length - 1]; // Last argument is the callback
    const args = [].slice.call(arguments, 0, -1);
    let lines = args[1] || 10;

    module.exports.cat.apply(undefined, args.concat([function(data) {
      cb(data.split('\n').slice(-lines).join('\n'));
    }]));
  };


module.exports.sort = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);

  module.exports.cat.apply(undefined, args.concat([function(data) {
    let output = data.split('\n');

    if (data[output.length-1] === '') {
      output.pop();
    }

    cb(output.sort(function(a, b) {
      let aReduced = a.replace(/[^A-Za-z]/g, '');
      let bReduced = b.replace(/[^A-Za-z]/g,'')
      return aReduced < bReduced ? -1 : (aReduced > bReduced ? 1 : 0);
    }).join('\n'));
  }]));
};

module.exports.wc = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  let output;


  module.exports.cat.apply(undefined, args.concat([function(data) {
    let output = data.split('\n');

    if (output[output.length-1] === '') {
      output = output.length-1;
    } else {
      output = output.length;
    }
    cb(output.toString());

  }]));
};

module.exports.uniq = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  let output;

  module.exports.cat.apply(undefined, args.concat([function(data) {
    cb(data.split('\n').filter(function(val, index, arr) {
      return val !== arr[index-1];
    }).join('\n'));
  }]));
}

module.exports.curl = function() {
  const cb = arguments[arguments.length - 1]; // Last argument is the callback
  const args = [].slice.call(arguments, 0, -1);
  let output;

  request(args[0], function(err, res, body) {
    if (err) throw err;
    cb(body);
  });
};
