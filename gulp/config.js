'use strict';
// Dependencies
var args         = require('yargs').argv; //cl args
var path         = require('path'); // native node module for handling and transforming paths https://nodejs.org/docs/latest/api/path.html
var gutil        = require('gulp-util');
var gulp         = require('gulp');
var _            = require('lodash');
var requireDir   = require('require-dir'); //Recursively iterates over specified directory, require()'ing each file, and returning a nested hash structure containing those modules.
var log          = require('./util/log');
var errorHandler = require('./util/errorHandler');

// Config Object to export
var exportConfig = {};

//  Paths
var SRC        = './src',
    SRC_APP    = path.join(SRC, 'app'),
    SRC_SASS   = path.join(SRC, 'sass'),
    SRC_CSS    = path.join(SRC, 'css'),
    SRC_ASSETS = path.join(SRC, 'assets'),
    SRC_FONTS  = path.join(SRC, 'fonts'),
    TMP        = './.tmp',
    INDEX      = path.join(SRC, 'index.html'),
    bower      = {
      json       : require('../bower.json'),
      directory  : './bower_components/',
      ignorePath : '../..'
    };

// default config
var defaultConfig = {
    src          : SRC,
    index        : INDEX,
    app          : SRC_APP,
    srcjs        : [
      SRC_APP + '/**/*.app.js',
      SRC_APP + '/**/*.js'
    ],
    appjs        : [
      SRC_APP + '/**/*.app.js',
      SRC_APP + '/**/*.js',
      '!' + SRC_APP + '/**/.spec.js',
      '!' + SRC_APP + '/**/.mock.js'
    ],
    gulpjs       : ['gulpfile.js', './gulp/**/*.js'],
    sass         : [SRC_SASS + '/**/*.scss'],
    css          : SRC_CSS,
    fonts        : SRC_FONTS,
    assets       : SRC_ASSETS,
    images       : SRC_ASSETS + '/images',
    tmp          : TMP,
    log          : log,
    errorHandler : errorHandler,
    inject       : {
      ignorePath   : [ SRC, TMP + './serve'],
      addRootSlash : false,
      relative     : true
    },
    wiredep      : {
      bowerJson    : bower.json,
      directory    : bower.directory,
      ignorePath   : bower.ignorePath,
      exclude      : [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
    }
};

// Environment Targets
var env = {
  dev: {
      name          : 'Development',
      cssMinify     : false,
      jsUglify      : false,
      jsSourceMaps  : true,
      jshintOptions : {
      devel         : true
      }
  },
  prod: {
      name          : 'Production',
      cssMinify     : true,
      jsUglify      : true,
      jsSourceMaps  : true,
      jshintOptions : {
      devel         : false
      }
  }
};

// export the config object
exportConfig = _.extend( defaultConfig);

gulp.task('config',  function(){
    var configString = JSON.stringify(exportConfig, null, 2);
    log(
            ' \n' +
            '      Current Config:'+' \n'
    );
    log( configString );
    log(' \n');
});

module.exports =  exportConfig;
