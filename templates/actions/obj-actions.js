var ObjDispatcher = require('../dispatchers/obj-dispatcher');
var ObjConstants = require('../constants/obj-constants');
var ObjActions = {
  createObj: function(data) {
    ObjDispatcher.handleViewAction({
      type: ObjConstants.ActionTypes.CREATE_OBJ,
      data: data
    });
  },
  updateObj: function(data) {
    ObjDispatcher.handleViewAction({
      type: ObjConstants.ActionTypes.UPDATE_OBJ,
      data: data
    });
  },
  destroyObj: function(id) {
    ObjDispatcher.handleViewAction({
      type: ObjConstants.ActionTypes.DESTROY_OBJ,
      id: id
    });
  }
}

module.exports = ObjActions;
