jest.dontMock('react/lib/copyProperties');
jest.dontMock('../../constants/obj-constants');
jest.dontMock('../obj-store');

describe('ObjStore', function() {
  var ObjConstants = require('../../constants/obj-constants');
  beforeEach(function () {
    ObjDispatcher = require('../../dispatchers/obj-dispatcher');
    ObjStore = require('../obj-store');
  });
  describe('payload', function () {
    it('should register a callback with the dispatcher', function() {
      expect(ObjDispatcher.register.mock.calls.length).toBe(1);
    });
  });
  describe('actions', function () {
    beforeEach(function () {
      callback = ObjDispatcher.register.mock.calls[0][0];
    });
    it('#objs is initialized with an empty collection', function () {
      expect(ObjStore.objs()).toEqual([]);
    });
    it('#new returns an blank obj', function () {
      expect(ObjStore.new()).toEqual({
          id: null,
          title: null
        });
    });
    it('#all', function () {
      ObjStore.triggerChange = jest.genMockFunction();
      ObjStore.all();
      expect(ObjStore.triggerChange.mock.calls.length).toBe(1)
    });
    it('#create', function () {
      var actionObjCreate = {
        source: 'VIEW_ACTION',
        action: {
          type: ObjConstants.ActionTypes.CREATE_OBJ,
          data: {title: 'foo'}
        }
      };
      callback(actionObjCreate);
      expect(ObjStore.objs()).toEqual([actionObjCreate.action.data])
    });
    it('#update', function () {
      ObjStore.create({title: 'foo'})
      var actionObjUpdate = {
        source: 'VIEW_ACTION',
        action: {
          type: ObjConstants.ActionTypes.UPDATE_OBJ,
          data: {id: 1, title: 'bar'}
        }
      };
      callback(actionObjUpdate);
      expect(ObjStore.objs()).toEqual([actionObjUpdate.action.data])
    });
    it('#update', function () {
      ObjStore.create({title: 'foo'})
      var actionObjDestroy = {
        source: 'VIEW_ACTION',
        action: {
          type: ObjConstants.ActionTypes.DESTROY_OBJ,
          id: 1
        }
      };
      callback(actionObjDestroy);
      expect(ObjStore.objs()).toEqual([])
    });
  });
  it('#find returns the index of the found obj', function () {
    ObjStore.create({title: 'foo'})
    expect(ObjStore.find(1)).toEqual(0)
    expect(ObjStore.find(2)).toEqual(undefined)
  });
  describe('events', function () {
    beforeEach(function () {
      bean = require('bean');
      CHANGE_EVENT = 'change';
      FAIL_TO_CREATE_EVENT = 'creation-failed';
    });
    it('#addChangeEvent', function () {
      var callback = jest.genMockFunction();
      ObjStore.addChangeEvent(callback)
      var arguments = bean.on.mock.calls[0];
      expect(arguments[0]).toEqual(ObjStore);
      expect(arguments[1]).toEqual(CHANGE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#removeChangeEvent', function () {
      var callback = jest.genMockFunction();
      ObjStore.removeChangeEvent(callback)
      var arguments = bean.off.mock.calls[0];
      expect(arguments[0]).toEqual(ObjStore);
      expect(arguments[1]).toEqual(CHANGE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#addFailToTakeAction', function () {
      var callback = jest.genMockFunction();
      ObjStore.addFailToTakeAction(callback)
      var arguments = bean.on.mock.calls[0];
      expect(arguments[0]).toEqual(ObjStore);
      expect(arguments[1]).toEqual(FAIL_TO_CREATE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#removeFailToTakeAction', function () {
      var callback = jest.genMockFunction();
      ObjStore.removeFailToTakeAction(callback)
      var arguments = bean.off.mock.calls[0];
      expect(arguments[0]).toEqual(ObjStore);
      expect(arguments[1]).toEqual(FAIL_TO_CREATE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#triggerChange', function () {
      var data = {};
      ObjStore.triggerChange(data)
      var arguments = bean.fire.mock.calls[0];
      expect(arguments[0]).toEqual(ObjStore);
      expect(arguments[1]).toEqual(CHANGE_EVENT);
      expect(arguments[2]).toEqual(data);
    });
    it('#triggerFailToTakeAction', function () {
      var data = {};
      ObjStore.triggerFailToTakeAction(data)
      var arguments = bean.fire.mock.calls[0];
      expect(arguments[0]).toEqual(ObjStore);
      expect(arguments[1]).toEqual(FAIL_TO_CREATE_EVENT);
      expect(arguments[2]).toEqual(data);
    });
  });
});
