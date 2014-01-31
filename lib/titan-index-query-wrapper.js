'use strict';

var TitanVertexWrapper = require('./titan-vertex-wrapper');

var TitanIndexQueryWrapper = module.exports = function (gremlin, query) {
  this.gremlin = gremlin;
  this.query = query;
};

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

TitanIndexQueryWrapper.prototype.edgesSync = function() {
  return this.query.edgesSync();
};

TitanIndexQueryWrapper.prototype.limitSync = function(number) {
  return this.query.limitSync(number);
};

