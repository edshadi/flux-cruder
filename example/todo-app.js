var FluxCruder = require('flux-cruder');
var TodoApp = new FluxCruder({
  baseUrl: '/todos',
  api: {
    // optional if you provide a RESTful baseUrl, we'll know what to do.
    // If your routes are not RESTful, then provide create, read, update, delete (CRUD) routes.
  },
  attributes: ['title', 'done'] // we give a store.new() method that returns an object representation of your resource.
});

module.exports = TodoApp;
