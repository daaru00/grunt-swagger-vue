# grunt-swagger-vue

Swagger Codegen for Vue.js

fork of [swagger-vue](https://github.com/chenweiqun/swagger-vue)

## Getting Started

### Requirements
- [Grunt](https://gruntjs.com/)

### Installation
```bash
npm install grunt-swagger-vue --dev
```
### Configuration

```javascript
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'grunt-swagger-vue': {
      options: {
        swagger: "client/swagger.json",
        className: "API",
        moduleName: "vue-api-client",
        dest: 'client/javascript'
      },
      dist: {

      }
    }
  });
```

### Load task

```javascript
grunt.loadNpmTasks('grunt-swagger-vue');
```

## Example

Add in your package.json
```json
...
  "swagger": {
    "definition": "client/swagger.json",
    "className": "API",
    "moduleName": "api-client"
  }
...
```
Create Gruntfile.js
```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'grunt-swagger-vue': {
      options: {
        swagger: "<%= pkg.swagger.definition %>",
        className: "<%= pkg.swagger.className %>",
        moduleName: "vue-<%= pkg.swagger.moduleName %>",
        dest: 'client/javascript'
      },
      dist: {

      }
    }
  });

  grunt.loadNpmTasks('grunt-swagger-vue');

  grunt.registerTask('vue', ['swagger-vue-codegen']);

};
```
Execute in terminal
```bash
grunt vue
```

## Notes
Only compatible with Swagger v2

## Links
- [swagger-vue](https://github.com/chenweiqun/swagger-vue)
- [swagger-js-codegen](https://github.com/wcandillon/swagger-js-codegen)

## License

[MIT](https://opensource.org/licenses/MIT)
