'use strict';

var util = require('util');
var Gremlin = require('gremlin');
var TitanKeyMakerWrapper = require('./titan-key-maker-wrapper');
var TitanLabelMakerWrapper = require('./titan-label-maker-wrapper');

var TitanGraphWrapper = module.exports = function (gremlin, graph) {
  Gremlin.GraphWrapper.call(this, gremlin, graph);

  this.Order = gremlin.Order;
  this.Cmp = gremlin.Cmp;
  this.Contain = gremlin.Contain;
  this.Geo = gremlin.Geo;
  this.Geoshape = gremlin.Geoshape;
  this.Text = gremlin.Text;
  this.ClassTypes = gremlin.ClassTypes;
};

util.inherits(TitanGraphWrapper, Gremlin.GraphWrapper);

TitanGraphWrapper.prototype.getType = function (name, callback) {
  var txn = this._getTransaction();
  return txn.getType(name, callback);
};

TitanGraphWrapper.prototype.getTypeSync = function (name) {
  var txn = this._getTransaction();
  return txn.getTypeSync(name);
};

TitanGraphWrapper.prototype.makeKey = function (name, in_callback) {
  var that = this;
  var txn = this._getTransaction();
  txn.makeKey(name, function (in_error, in_value) {
    if (in_error) {
      in_callback(in_error);
    } else {
      var maker = new TitanKeyMakerWrapper(
        that.gremlin,
        in_value
      );
      in_callback(null, maker);
    }
  });
};

TitanGraphWrapper.prototype.makeKeySync = function (name) {
  var txn = this._getTransaction();
  return new TitanKeyMakerWrapper(this.gremlin, txn.makeKeySync(name));
};

TitanGraphWrapper.prototype.makeLabel = function (name, in_callback) {
  var that = this;
  var txn = this._getTransaction();
  txn.makeLabel(name, function (in_error, in_value) {
    if (in_error) {
      in_callback(in_error);
    } else {
      var maker = new TitanLabelMakerWrapper(
        that.gremlin,
        in_value
      );
      in_callback(null, maker);
    }
  });
};

TitanGraphWrapper.prototype.makeLabelSync = function (name) {
  var txn = this._getTransaction();
  return new TitanLabelMakerWrapper(this.gremlin, txn.makeLabelSync(name));
};

TitanGraphWrapper.prototype.getVertex = function (key, attr, callback) {
  if (callback === undefined) {
    callback = attr;
    return Gremlin.GraphWrapper.prototype.getVertex.call(this, key, callback);
  }

  var gremlin = this.gremlin;
  var txn = this._getTransaction();

  txn.getVertex(key, attr, function (err, v) {
    if (err) return callback(err);
    callback(null, v ? gremlin.wrapVertex(v) : null);
  });
};
