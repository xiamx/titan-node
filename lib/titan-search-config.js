/**
 * @fileoverview Definition of the TitanSearchConfig class, which
 * represents the search and indexing related configuration options for Titan.
 */

/**
 * @constructor General search configuration data.
 *
 * You probably want an extender of this class, specific to your search
 * engine of choice!
 * We currently only support a single search index.
 */
var SearchConfig = function (in_params) {

  in_params = in_params || {};

  in_params.index = in_params.index || { search : {} };
  var indexname = Object.keys(in_params.index)[0];

  in_params.index[indexname].backend = in_params.index[indexname].backend || 'elasticsearch';
  in_params.index[indexname].hostname = in_params.index[indexname].hostname || '127.0.0.1';

  this.index = in_params.index;
  this.indexname = indexname;
  this.current_index = this.index[this.indexname];
  this.storage_index_path = 'storage.index.' + this.indexname + '.';
};

/**
 * Synchronously extend a BaseConfiguration Java object with the properties
 * of this SearchConfig.
 */
SearchConfig.prototype.extendBaseConfiguration = function (in_baseConfig) {

  in_baseConfig.addPropertySync(this.storage_index_path + 'backend', this.current_index.backend);
  in_baseConfig.addPropertySync(this.storage_index_path + 'hostname', this.current_index.hostname);

  return in_baseConfig;
};

module.exports = SearchConfig;
