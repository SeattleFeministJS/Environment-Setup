'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
var p      = require('../../package.json');

gulp.task('help:app', function(){
  var lineLenght     = 48,
      packageName    = p.name,
      packageNameLen = packageName.length,
      tagLine        = '';

  if( packageNameLen < lineLenght) {
      var prependSpace     = '',
          appendSpace      = '',
          addSpaces        = (lineLenght-packageNameLen)/2;
      while (prependSpace.length < addSpaces) {
          prependSpace  += ' ';
          appendSpace   += ' ';
      }
      tagLine =prependSpace+packageName+appendSpace;
      config.log(tagLine.length, lineLenght);
      if( tagLine.length <= lineLenght) {
          tagLine += ' ';
      }
  }

  config.log(
    ' \n' +
    '            '+$.util.colors.white.bgBlue.bold('                                                 ')+' \n' +
    '            '+$.util.colors.white.bgBlue.bold(tagLine)+' \n' +
    '            '+$.util.colors.white.bgBlue.bold('                                                 ')+' \n' +
    ' \n'
  );
  config.log(
    ' \n' +
    '      Usage: '+' \n' +
    '        gulp [option] [-t target]'+' \n' +
    ' \n' +
    '      if -t or --target is not specified, a default target will be used'+' \n' +
    '      run '+$.util.colors.white.bgBlue.bold('gulp config')+' for more info on the default target'+' \n'
  );
  config.log(
    ' \n' +
    '      Options: '+' \n' +
    '        watch            Watch for source file changes (js|sass|assets|...)'+' \n' +
    '        build            Build entire project then watch'+' \n' +
    '        config           Show config of a specified target (-t)'+' \n' +
    ' \n' +
    '      Arguments: '+' \n' +
    '        -h, --help       This command'+' \n' +
    '        -d, --dev        developpement context'+' \n' +
    '        -p, --prod       production context'+' \n' +
    '        -t, --target     yii|symfony'+' \n'
  );

  //gulp.task('config');
  config.log('      Current Config: '+' \n'+JSON.stringify(config, null, 2));
  config.log('\n');
});

gulp.task('help:tasks', $.taskListing);

gulp.task('help', ['help:app', 'help:tasks']);
