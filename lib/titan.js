/**
 * @fileoverview Definition of the Titan class, the programmer's interface
 * to Titan in node.
 */
var TitanConfig = require('./titan-config.js');
var TitanGremlin = require('./titan-gremlin.js');

/**
 * @constructor Make a Titan instance, which you can then open.
 * The calls to open or openSync will produce a TitanGraphWrapper, which you
 * can work with to query and mutate the data.
 *
 * @param titanConfig
 * @param gremlinConfig
 */
var Titan = function (in_params) {
  in_params = in_params || {};
  this._config = new TitanConfig(in_params.titanConfig);
  this._titanGremlin = new TitanGremlin(in_params.gremlinConfig);
  // Alias for convenience.
  this._java = this._titanGremlin.java;
};

/**
 * Make an Apache BaseConfiguration Java object and return it.
 * TODO check for errors.
 */
Titan.prototype.makeBaseConfiguration = function () {
  var baseConfigClass = this._java.import(
    'org.apache.commons.configuration.BaseConfiguration'
  );
  var baseConfig = new baseConfigClass();
  baseConfig = this._config.extendBaseConfiguration(baseConfig);
  return baseConfig;
};

/**
 * Asynchronously open a graph, taking care to wrap it before delivering it to
 * the callback.
 *
 * @param in_callback : will give error in first position, or graph in
 *     second position.
 */
Titan.prototype.open = function (in_callback) {
  var config = this.makeBaseConfiguration();
  var that = this;
  this._titanGremlin.Factory.open(
    config,
    function (error, graph) {
      if (error) {
        in_callback(error);
      } else {
        in_callback(null, that._titanGremlin.wrap(graph));
      }
    }
  );
};

/**
 * Synchronous version of open.
 */
Titan.prototype.openSync = function () {
  var config = this.makeBaseConfiguration();
  // TODO check for an error first.
  return this._titanGremlin.wrap(
    this._titanGremlin.Factory.openSync(config)
  );
};

module.exports = Titan;
