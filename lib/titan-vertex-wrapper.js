'use strict';

var util = require('util');
var Gremlin = require('gremlin');

var TitanVertexWrapper = module.exports = function (gremlin, el) {
  Gremlin.VertexWrapper.call(this, gremlin, el);
};

util.inherits(TitanVertexWrapper, Gremlin.VertexWrapper);

/**
 * Get all properties
 *
 * Should be part of gremlin-node
 */
TitanVertexWrapper.prototype.getPropertiesSync = function () {
  var keys = this.getPropertyKeysSync();
  var properties = {};
  for(var i=0; i < keys.length; i++) {
    properties[keys[i]] = this.el.getPropertySync(keys[i]);
  }

  return properties;
};


/**
 * Get all property keys
 *
 * Should be part of gremlin-node
 */
TitanVertexWrapper.prototype.getPropertyKeysSync = function () {
  var keysIterator = this.el.getPropertyKeysSync().iteratorSync();
  var keys = [];

    while (keysIterator.hasNextSync()) {
      keys.push( keysIterator.nextSync() );
    }

  return keys;
};
