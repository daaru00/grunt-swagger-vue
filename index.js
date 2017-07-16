const parse = require('./lib/parse.js')
const codegen = require('./lib/codegen.js')

module.exports = function() {
  var callback = this.async();
  var opt = this.options();
  var distFileName = path.join(opt.dest, opt.moduleName + '.js');

  fs.readFile(opt.swagger, function(err, data) {
    if (err) {
      grunt.log.error(err.toString());
      callback(false);
    } else {
      var parsedData = JSON.parse(data);

      let data = parse({
        swagger: parsedData,
        moduleName: opt.moduleName,
        className: opt.className
      })
      let codeResult = codegen(data)

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
}
