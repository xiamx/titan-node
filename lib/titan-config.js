/**
 * @fileoverview Definition of the TitanConfig class, which represents a
 * particular configuration for titan, i.e. the thing you would pass to
 * TitanFactory.open
 */

var CassandraStorageConfig = require('./titan-cassandra-storage-config.js');

/**
 * @constructor JavaScript representation of a Titan configuration.
 * Almost 1-1 from storage configuartion detailed here:
 * https://github.com/thinkaurelius/titan/wiki/Graph-Configuration
 */
var TitanConfig = function (in_params) {
  // Right now we just ask for storage configuration.S
  // Extend as needed.
  in_params = in_params || {};
  in_params.storage = in_params.storage || {};
  // Must know the backend so we can instantiate the appropriate specialization.
  // Default to cassandra; this is arbitrary.
  in_params.storage.backend = in_params.storage.backend || 'cassandra'
  if (in_params.storage.backend === 'cassandra'
    || in_params.storage.backend === 'cassandrathrift') {
    this.storage = new CassandraStorageConfig(in_params.storage);
  } else {
    console.log('TitanConfig : config options for this storage engine are not yet implemented!', in_params.storage);
  }
};

TitanConfig.prototype.extendBaseConfiguration = function (in_baseConfig) {
  return this.storage.extendBaseConfiguration(in_baseConfig);
};

module.exports = TitanConfig;
