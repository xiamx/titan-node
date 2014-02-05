/**
 * @fileoverview
 * Wrapper for com.thinkaurelius.titan.core.TitanIndexQuery
 * http://thinkaurelius.github.io/titan/javadoc/current/com/thinkaurelius/titan/core/TitanIndexQuery.html
 */

'use strict';

var TitanVertexWrapper = require('./titan-vertex-wrapper');

var TitanIndexQueryWrapper = module.exports = function (gremlin, query) {
  this.gremlin = gremlin;
  this.query = query;
};

/**
 * Get all vertices returned by this query - synchronous version
 * Wraps http://thinkaurelius.github.io/titan/javadoc/current/com/thinkaurelius/titan/core/TitanIndexQuery.html#vertices%28%29
 */
TitanIndexQueryWrapper.prototype.verticesSync = function() {
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
TitanIndexQueryWrapper.prototype.limitSync = function(number) {
  return this.query.limitSync(number);
};
