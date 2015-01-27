var ObjDispatcher = require('../dispatchers/obj-dispatcher');
var ObjConstants = require('../constants/obj-constants');
var bean = require('bean');

var ObjStore = (function() {
  var _objs = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = ObjConstants.ActionTypes;
  return {
    objs: function() {
      return _objs;
    },
    new: function() {
      return {
        id: null,
        title: null
      }
    },
    all: function() {
      this.triggerChange('yo');
    },
    create: function(obj) {
      obj.id = _objs.length + 1;
      _objs.push(obj);
      this.triggerChange(obj);
    },
    update: function(obj) {
      var index = this.find(obj.id);
      obj.id = parseInt(obj.id);
      if(index === undefined) return this.triggerFailToTakeAction();
      _objs[index] = obj;
      this.triggerChange();
    },
    destroy: function(id) {
      var index = this.find(id);
      if(index === undefined) return this.triggerFailToTakeAction();
      _objs.splice(index, 1);
      this.triggerChange();
    },

    find: function(id) {
      var id = parseInt(id);
      var found = undefined;
      _objs.some(function(obj, i) {
        if(obj.id === id) found = i;
      });
      return found;
    },
    addChangeEvent: function(callback) {
      bean.on(this, CHANGE_EVENT, callback);
    },
    removeChangeEvent: function(obj) {
      bean.off(this, CHANGE_EVENT, obj);
    },
    addFailToTakeAction: function(callback) {
      bean.on(this, FAIL_TO_CREATE_EVENT, callback);
    },
    removeFailToTakeAction: function(obj) {
      bean.off(this, FAIL_TO_CREATE_EVENT, obj);
    },
    triggerFailToTakeAction: function(data) {
      bean.fire(this, FAIL_TO_CREATE_EVENT, data);
    },
    triggerChange: function(data) {
      bean.fire(this, CHANGE_EVENT, data);
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_OBJ:
          this.create(action.data);
          break;
        case ActionTypes.UPDATE_OBJ:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_OBJ:
          this.destroy(action.id);
          break;
        default:
          // do nothing
      }
    }
  }
}())

ObjDispatcher.register(ObjStore.payload.bind(ObjStore));

module.exports = ObjStore;
