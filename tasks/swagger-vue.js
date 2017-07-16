module.exports = function(grunt) {
  'use strict';
  var fs = require('fs');
  var path = require('path');
  var parse = require(path.join('..', 'lib', 'parse.js'))
  var codegen = require(path.join('..', 'lib', 'codegen.js'))

  grunt.registerMultiTask('swagger-vue', 'Swagger codegen for Vue.js', function() {

    var callback = this.async();
    var opt = this.options();
    var distFileName = path.join(opt.dest, opt.moduleName + '.js');

    fs.readFile(opt.swagger, function(err, data) {
      if (err) {
        grunt.log.error(err.toString());
        callback(false);
      } else {
        var parsedData = JSON.parse(data);

        var data = parse({
          swagger: parsedData,
          moduleName: opt.moduleName,
          className: opt.className
        })
        var codeResult = codegen(data)

        fs.writeFile(distFileName, codeResult, function(err) {
          if (err) {
            grunt.log.error(err.toString());
            callback(false);
          } else {
            grunt.log.writeln('Generated ' + distFileName + ' from ' + opt.swagger);
          }
        })
      }
    });
  });
}
