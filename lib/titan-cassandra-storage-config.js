/**
 * @fileoverview Definition of Titan storage options peculiar to Cassandra.
 */

var StorageConfig = require('./titan-storage-config.js');

/**
 * @constructor Extend the StorageConfig class with information peculiar to
 * Cassandra. Use this if the storage backend is cassandra or cassandrathrift.
 * https://github.com/thinkaurelius/titan/wiki/Using-Cassandra
 */
var CassandraStorageConfig = function (in_params) {

  in_params = in_params || {};

  StorageConfig.call(this, in_params);

  this.keyspace = in_params.keyspace || 'titan';
  this.hostname = in_params.hostname;
  this.port = in_params.port || 9160;
  this.connection_timeout = in_params.connection_timeout || 10000;
  this.connection_pool_size = in_params.connection_pool_size || 32;
  this.read_consistency_level = in_params.read_consistency_level || 'QUORUM';
  this.write_consistency_level = in_params.write_consistency_level || 'QUORUM';
  this.replication_factor = in_params.replication_factor || 1;
  if (this.backend === 'cassandrathrift') {
    this.frame_size_mb = in_params.frame_size_mb || 16;
  }

};

CassandraStorageConfig.prototype = Object.create(StorageConfig.prototype);

CassandraStorageConfig.prototype.extendBaseConfiguration = function (in_baseConfig) {

  in_baseConfig = StorageConfig.prototype.extendBaseConfiguration.apply(this, arguments);

  in_baseConfig.addPropertySync('storage.keyspace', this.keyspace);
  in_baseConfig.addPropertySync('storage.hostname', this.hostname);
  in_baseConfig.addPropertySync('storage.port', this.port);
  in_baseConfig.addPropertySync('storage.connection-timeout', this.connection_timeout);
  in_baseConfig.addPropertySync('storage.connection-pool-size', this.connection_pool_size);
  in_baseConfig.addPropertySync('storage.read-consistency-level', this.read_consistency_level);
  in_baseConfig.addPropertySync('storage.write-consistency-level', this.write_consistency_level);
  in_baseConfig.addPropertySync('storage.replication-factor', this.replication_factor);
  in_baseConfig.addPropertySync('storage.frame_size_mb', this.frame_size_mb);

  return in_baseConfig;

};

module.exports = CassandraStorageConfig;
