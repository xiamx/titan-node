/**
 * @fileoverview Definition of Titan search / indexing options peculiar to Elastic Search.
 */

var SearchConfig = require('./titan-search-config.js');

/**
 * @constructor Extend the SearchConfig class with information peculiar to
 * ElasticSearch.
 */
var ElasticSearchConfig = function (in_params) {

  in_params = in_params || {};

  SearchConfig.call(this, in_params);

  this.current_index.client_only = in_params["client-only"] || in_params.client_only || true;
  this.current_index.local_mode = in_params["local-mode"] || in_params.local_mode || false;
};

ElasticSearchConfig.prototype = Object.create(SearchConfig.prototype);

ElasticSearchConfig.prototype.extendBaseConfiguration = function (in_baseConfig) {

  in_baseConfig = SearchConfig.prototype.extendBaseConfiguration.apply(this, arguments);

  in_baseConfig.addPropertySync(this.storage_index_path + 'client-only', this.current_index.client_only);
  in_baseConfig.addPropertySync(this.storage_index_path + 'local-mode', this.current_index.local_mode);

  return in_baseConfig;
};

module.exports = ElasticSearchConfig;
