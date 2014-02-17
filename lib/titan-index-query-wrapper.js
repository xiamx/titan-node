/**
 * @fileoverview
 * Wrapper for com.thinkaurelius.titan.core.TitanIndexQuery
 * http://thinkaurelius.github.io/titan/javadoc/current/com/thinkaurelius/titan/core/TitanIndexQuery.html
 */

'use strict';

function queryWrapSync(op) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    this.query[op].apply(this.query, args);
    return this;
  };
}

var TitanVertexWrapper = require('./titan-vertex-wrapper');

var TitanIndexQueryWrapper = module.exports = function (gremlin, query) {
  this.gremlin = gremlin;
  this.query = query;
};

/** 
 * Get a JavaScript array of all vertices returned by this query
 * Convenience function
 * Related to http://thinkaurelius.github.io/titan/javadoc/current/com/thinkaurelius/titan/core/TitanIndexQuery.html#vertices%28%29
 */
TitanIndexQueryWrapper.prototype.verticesArraySync = function() {
  var vertexWrappers = [];
  try {
    var vertices = this.query.verticesSync();
    var verticesIterator = vertices.iteratorSync();

    while (verticesIterator.hasNextSync()) {
      vertexWrappers.push( new TitanVertexWrapper( this.gremlin, verticesIterator.nextSync().getElementSync() ) );
    }
  } catch(err) {
    console.error('Exception caught. Ignoring this query. Error was:');
    console.error(err);
  }
  return vertexWrappers;
};

/**
 * Set maximum number of elements to return - synchronous version
 * Wraps http://thinkaurelius.github.io/titan/javadoc/current/com/thinkaurelius/titan/core/TitanIndexQuery.html#limit%28int%29
 */
TitanIndexQueryWrapper.prototype.limit = queryWrapSync('limit');

/**
 * Get all vertices returned by this query - synchronous version
 * Wraps http://thinkaurelius.github.io/titan/javadoc/current/com/thinkaurelius/titan/core/TitanIndexQuery.html#vertices%28%29
 */
TitanIndexQueryWrapper.prototype.vertices = queryWrapSync('vertices');

/**
 * Get all edges returned by this query - synchronous version
 * Wraps http://thinkaurelius.github.io/titan/javadoc/current/com/thinkaurelius/titan/core/TitanIndexQuery.html#edges()
 */
TitanIndexQueryWrapper.prototype.edges = queryWrapSync('edges');
