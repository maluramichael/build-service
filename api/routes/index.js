const R = require('ramda');

const fs = require('fs');
const path = require('path');

module.exports = function (app, db) {
  const loadModules = function (resolve, reject) {
    fs.readdir(path.join(__dirname), function (error, files) {

      const getFilename = e => e.substr(0, e.lastIndexOf('.'));
      const isIndex = R.equals('index');

      const convertToNames = R.compose(
        R.reject(isIndex),
        R.map(getFilename),
      );

      const names = convertToNames(files);

      const requireModules = R.compose(
        R.all(R.equals(true)),
        R.map(module => module(app, db)),
        R.map(file => require(file)),
        R.map(file => path.join(__dirname, file))
      )

      const modulesLoaded = requireModules(names);

      if (modulesLoaded) {
        resolve();
      } else {
        reject('Not every module could be loaded');
      }
    });
  }

  return new Promise(loadModules);
}