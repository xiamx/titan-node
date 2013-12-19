/**
 * @fileoverview Definition of the TitanStorageConfig class, which
 * represents the storage-related configuartion options for Titan.
 */

/**
 * @constructor General storage configuration data. Pulled almost 1-1
 * from the relevant table found here:
 * https://github.com/thinkaurelius/titan/wiki/Graph-Configuration
 *
 * You probably want an extender of this class, specific to your storage
 * engine of choice!
 */
var StorageConfig = function (in_params) {

  in_params = in_params || {};

  this.backend = in_params.backend || 'cassandra';
  this.directory = in_params.directory;
  this.read_only = in_params.read_only || false;
  this.batch_loading = in_params.batch_loading || false;
  this.buffer_size = in_params.buffer_size || 1024;
  this.write_attempts = in_params.write_attempts || 5;
  this.read_attempts = in_params.read_attempts || 3;
  this.attempt_wait = in_params.attempt_wait || 250;
  this.page_size = in_params.page_size || 100;
  this.username = in_params.username;
  this.password = in_params.password;

};

/**
 * Synchronously extend a BaseConfiguration Java object with the properties
 * of this StorageConfig.
 */
StorageConfig.prototype.extendBaseConfiguration = function (in_baseConfig) {

  console.log('StorageConfig.extendBaseConfiguration', this);

  in_baseConfig.addPropertySync('storage.backend', this.backend);
  in_baseConfig.addPropertySync('storage.directory', this.directory);
  in_baseConfig.addPropertySync('storage.read-only', this.read_only);
  in_baseConfig.addPropertySync('storage.batch-loading', this.batch_loading);
  in_baseConfig.addPropertySync('storage.buffer-size', this.buffer_size);
  in_baseConfig.addPropertySync('storage.write-attempts', this.write_attempts);
  in_baseConfig.addPropertySync('storage.read-attempts', this.read_attempts);
  in_baseConfig.addPropertySync('storage.attempt-wait', this.attempt_wait);
  in_baseConfig.addPropertySync('storage.page-size', this.page_size);
  in_baseConfig.addPropertySync('storage.username', this.username);
  in_baseConfig.addPropertySync('storage.password', this.password);

  return in_baseConfig;

};

module.exports = StorageConfig;
