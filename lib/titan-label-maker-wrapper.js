'use strict';

var TitanLabelMakerWrapper = module.exports = function (gremlin, maker) {
  this.gremlin = gremlin;
  this.maker = maker;
};

TitanLabelMakerWrapper.prototype.nameSync = function (name) {
  this.maker.nameSync(name);
  return this;
};

TitanLabelMakerWrapper.prototype.name = function (name, in_callback) {
  return this.maker.name(name, in_callback);
};

TitanLabelMakerWrapper.prototype.directedSync = function () {
  this.maker.directedSync();
  return this;
};

TitanLabelMakerWrapper.prototype.directed = function (in_callback) {
  return this.maker.directed(in_callback);
};

TitanLabelMakerWrapper.prototype.unidirectedSync = function () {
  this.maker.unidirectedSync();
  return this;
};

TitanLabelMakerWrapper.prototype.unidirected = function (in_callback) {
  return this.maker.unidirected(in_callback);
};

TitanLabelMakerWrapper.prototype.oneToManySync = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.oneToManySync.apply(this.maker, args);
  return this;
};

TitanLabelMakerWrapper.prototype.oneToMany = function () {
  var args = Array.prototype.slice.call(arguments);
  return this.maker.oneToMany.apply(this.maker, args);
};

TitanLabelMakerWrapper.prototype.manyToOneSync = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.manyToOneSync.apply(this.maker, args);
  return this;
};

TitanLabelMakerWrapper.prototype.manyToOne = function () {
  var args = Array.prototype.slice.call(arguments);
  return this.maker.manyToOne.apply(this.maker, args);
};

TitanLabelMakerWrapper.prototype.oneToOneSync = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.oneToOneSync.apply(this.maker, args);
  return this;
};

TitanLabelMakerWrapper.prototype.oneToOne = function () {
  var args = Array.prototype.slice.call(arguments);
  return this.maker.oneToOne.apply(this.maker, args);
};

TitanLabelMakerWrapper.prototype.manyToManySync = function () {
  this.maker.manyToManySync();
  return this;
};

TitanLabelMakerWrapper.prototype.manyToMany = function (in_callback) {
  return this.maker.manyToMany(in_callback);
};

TitanLabelMakerWrapper.prototype.signatureSync = function () {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.signatureSync(types);
  return this;
};

TitanLabelMakerWrapper.prototype.sortKeySync = function () {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.sortKeySync(types);
  return this;
};

TitanLabelMakerWrapper.prototype.sortOrderSync = function (order) {
  this.maker.sortOrderSync(order);
  return this;
};

TitanLabelMakerWrapper.prototype.hiddenSync = function () {
  this.maker.hiddenSync();
  return this;
};

TitanLabelMakerWrapper.prototype.unModifiableSync = function () {
  this.maker.unModifiableSync();
  return this;
};

TitanLabelMakerWrapper.prototype.makeStaticSync = function (direction) {
  this.maker.makeStaticSync(direction);
  return this;
};

TitanLabelMakerWrapper.prototype.make = function (callback) {
  return this.maker.make(callback);
};

TitanLabelMakerWrapper.prototype.makeSync = function (callback) {
  return this.maker.makeSync();
};
