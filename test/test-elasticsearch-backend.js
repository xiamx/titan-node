/**
 * @fileoverview
 * Sample Application.
 * Launch Titan with a Cassandrathrift storage backend
 * as well as with an external Elasticsearch backend for 
 * indexing.
 * Define properties, add several vertices and perform
 * indexing queries.
 */


var TitanNode = require('../lib/titan.js');
var async = require('async');

var setPropertySchema = function(graph, name, dataType, classType, indexName, mapping) {
  var maker = graph.makeKeySync(name).dataTypeSync(dataType);
  
  if (indexName) {
    maker.indexedSync(indexName, classType, mapping).makeSync();
  } else {
    maker.indexedSync(classType).makeSync();
  }
};

var titanInstance = new TitanNode({
  titanConfig : {
    autotype : 'none',
    storage : {
      backend : 'cassandrathrift',
      hostname : '127.0.0.1',
      keyspace : 'test',
      index : {
        search : {
          sniff : false,
          backend : 'elasticsearch',
          hostname : '127.0.0.1',
          client_only : true
        }
      }
    }
  },
  gremlinConfig : {
    loglevel : 'INFO'
  }
});

// Titan.open will try to produce a TitanGraph which we can use to do
// queries and mutations.
titanInstance.open(function (in_error, in_graph) {

    var errorPrinter = function(error) { 
      if (error) {
        console.log(error); 
      }
    };
    
    errorPrinter(in_error);

    var actions = [];
    try {
      setPropertySchema(in_graph, 'text', in_graph.ClassTypes.String, in_graph.ClassTypes.Vertex, 'search', [{key : TitanNode.Mapping.MAPPING_PREFIX, value : TitanNode.Mapping.TEXT}]);
      setPropertySchema(in_graph, 'testname', in_graph.ClassTypes.String, in_graph.ClassTypes.Vertex);
      setPropertySchema(in_graph, 'year', in_graph.ClassTypes.Integer, in_graph.ClassTypes.Vertex, 'search');
    } catch(err) {
    }
    console.log('Adding vertices');

    actions = actions.concat([
      function(callback) {
        in_graph.addVertex(null, callback);
      },
      function(vertex, callback) {    
        var properties = { 
          testname : 'test', 
          text : 'All Your Base', 
          year : 1954 
        };
        vertex.setProperties(properties, callback);
      },
      function(callback) {
        in_graph.addVertex(null, callback);
      },
      function(vertex, callback) {    
        var properties = { 
          testname : 'test', 
          text : 'AllYourBaes', 
          year : 1974
        };
        vertex.setProperties(properties, callback);
      },
      function(callback) {
        in_graph.addVertex(null, callback);
      },
      function(vertex, callback) {    
        var properties = { 
          testname : 'test', 
          text : 'AllyourBase', 
          year : 1990
        };
        vertex.setProperties(properties, callback);
      },
      function(callback) {
        in_graph.addVertex(null, callback);
      },
      function(vertex, callback) {    
        var properties = { 
          testname : 'test', 
          text : 'Are Belong', 
          year : 2014
        };
        vertex.setProperties(properties, callback);
      },
      function(callback) {
        in_graph.addVertex(null, callback);
      },
      function(vertex, callback) {    
        var properties = { 
          testname : 'test', 
          text : 'To Us', 
          year : 1
        };
        vertex.setProperties(properties, callback);
      },
      function(callback) {    
        in_graph.commit( function(error){
          console.log('Vertex commited');
          callback(error);
        });
      },
      function(callback) {  
        in_graph.getVertices(function(error, result){
          if (error) {
            callback(error);
          }
          console.log('Printing all vertices:');
          result.forEach(function(v){
            v.getProperty('text', function(error, p) {
              console.log(p);
            });
          });
          callback(0);
        });
      },
      function(callback) {  
        in_graph.indexQuery('search','v.text:All', function(error, query){
          if (error) {
            console.log(error);
            return;
          }
          var a = query.verticesSync();
          a.forEach(function(v){
            v.getProperty('text', function(error, p) {
              console.log('text:' + p);
            });
          });
          callback(0);
        });
      },
      function(callback) {  
        in_graph.indexQuery('search','v.year:[1970 TO 1995]', function(error, query){
          if (error) {
            console.log(error);
            return;
          }
          var a = query.verticesSync();
          a.forEach(function(v){
            v.getProperties(['text', 'year'], function(error, p) {
              console.log('Text: ' + p.text + ' Year: ' + p.year);
            });
          });
          callback(0);
        });
      }
    ]);
    
    async.waterfall(actions, errorPrinter );

    var result = in_graph.getVertices();
    console.log('Printing all vertices:');
    result.forEach(function(v){
      v.getProperty('text', function(error, p) {
        console.log(p);
      });
    });

});
