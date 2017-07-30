# grunt-swagger-vue

Swagger Codegen for Vue.js

fork of [swagger-vue](https://github.com/chenweiqun/swagger-vue)

## Getting Started

### Requirements
- [Grunt](https://gruntjs.com/)

### Installation
```bash
npm install grunt-swagger-vue --save-dev
```
### Configuration

```javascript
  grunt.initConfig({
    'swagger-vue': {
      options: {
        swagger: "client/swagger.json",
        className: "MyClassName",
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
    "className": "MyClassName",
    "moduleName": "api-client"
  }
...
```
Create Gruntfile.js
```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'swagger-vue': {
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
  grunt.registerTask('vue', ['swagger-vue']);

};
```
Execute in terminal
```bash
grunt vue
```

## Generated client's usage

In Vue.js main file initialize the API plugin with domain param.
```javascript
import MyClassName from './lib/vue-api-client.js'
Vue.use(MyClassName, {
  domain: 'http://localhost:3000/api'
})
```

Import API models into Vue.js component, for example import user model and use login method to generate a new token.
```javascript
import { AccessToken, user } from '../lib/vue-api-client.js'

user.login({
  credentials: {
    username: 'admin',
    password: 'admin'
  }
}).then(function (response) {
  console.log(response.data) // {id: "<token>", ttl: 1209600, created: "2017-01-01T00:00:00.000Z", userId: 1}
}).catch(function (error) {
  console.log(error.response.data) // your error response
})
```
Then set the Authorization header for all future request.
```javascript
var token = response.data
AccessToken.set(token) // now access token is set
```
You can also clear it for logout purpose
```javascript
AccessToken.clear() // Authorization header is now empty
```

All requests use [axinos](https://www.npmjs.com/package/axios) module returning a promise, for more information about that follow axios documentation

## Notes
Code generator is only compatible with Swagger v2 and generated client is exported in ES6

## Links
- [swagger-vue](https://github.com/chenweiqun/swagger-vue)
- [swagger-js-codegen](https://github.com/wcandillon/swagger-js-codegen)

## License

[MIT](https://opensource.org/licenses/MIT)
