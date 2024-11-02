const analyser = require('./assertion-analyser');
const EventEmitter = require('events').EventEmitter;

const Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

let mocha = new Mocha();
let testDir = './tests';

// Only add test files if the directory exists
if (fs.existsSync(testDir)) {
  // Add each .js file to the mocha instance
  fs.readdirSync(testDir).filter(function(file){
      return file.substr(-3) === '.js';
  }).forEach(function(file){
      mocha.addFile(path.join(testDir, file));
  });
} else {
  console.log("No tests directory found, skipping test setup.");
}

let emitter = new EventEmitter();
emitter.run = function() {
  let tests = [];
  let context = "";
  let separator = ' -> ';

  try {
    let runner = mocha.ui('tdd').run()
      .on('test end', function(test) {
        let body = test.body.replace(/\/\/.*\n|\/\*.*\*\//g, '');
        body = body.replace(/\s+/g,' ');
        let obj = {
          title: test.title,
          context: context.slice(0, -separator.length),
          state: test.state,
          assertions: analyser(body)
        };
        tests.push(obj);
      })
      .on('end', function() {
        emitter.report = tests;
        emitter.emit('done', tests);
      })
      .on('suite', function(s) {
        context += (s.title + separator);
      })
      .on('suite end', function(s) {
        context = context.slice(0, -(s.title.length + separator.length));
      });
  } catch(e) {
    throw(e);
  }
};

module.exports = emitter;
