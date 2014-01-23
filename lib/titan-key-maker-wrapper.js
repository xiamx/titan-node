'use strict';

/**
 * @constructor Thin wrapper for a Titan StandardKeyMaker:
 *   com.thinkaurelius.titan.graphdb.types
 * featuring wrappers for synchronous and asynchronous method calls.
 */
var TitanKeyMakerWrapper = module.exports = function (gremlin, maker) {
  this.gremlin = gremlin;
  this.maker = maker;
};

TitanKeyMakerWrapper.prototype.nameSync = function (in_name) {
  this.maker.nameSync(in_name);
  return this;
};

TitanKeyMakerWrapper.prototype.name = function (in_name, in_callback) {
  return this.maker.name(in_name, in_callback);
};

/**
 * Set the data type for the key.
 *
 * @param in_clazz : a Java class as represented here in JavaScript. How do you
 *     get a hold of such a thing? The node-java object's getClassLoader
 *     method gives an object with methods loadClass and loadClassSync. Just
 *     give the string Java classpath to those and voila.
 *     As an application developer, you probably cannot be bothered with this
 *     nonsense. TODO abstract it, but TBD HOW?!
 */
TitanKeyMakerWrapper.prototype.dataTypeSync = function (in_clazz) {
  this.maker.dataTypeSync(in_clazz);
  return this;
};

TitanKeyMakerWrapper.prototype.dataType = function (in_clazz, in_callback) {
  return this.maker.dataType(in_clazz, in_callback);
};

TitanKeyMakerWrapper.prototype.listSync = function () {
  this.maker.listSync();
  return this;
};

TitanKeyMakerWrapper.prototype.list = function (in_callback) {
  return this.maker.list(in_callback);
};

TitanKeyMakerWrapper.prototype.singleSync = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.singleSync.apply(this.maker, args);
  return this;
};

/**
 * Note that you must give a callback here, but we deal with it via the
 * arguments array because the method single on the StandardKeyMaker class
 * is overloaded.
 */
TitanKeyMakerWrapper.prototype.single = function () {
  var args = Array.prototype.slice.call(arguments);
  var callback;
  if (args.length === 2) {
    // Two arguments given => we assume the first one is a
    // UniquenessConsistency value and the second is the callback.
    args = [args[0]];
    callback = args[1];
    return this.maker.single(args, callback);
  } else {
    callback = args[0];
    return this.maker.single(callback);
  }
};

TitanKeyMakerWrapper.prototype.uniqueSync = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.uniqueSync.apply(this.maker, args);
  return this;
};

/**
 * Callback is still required even though it's not listed explicitly; see
 * the comment for single.
 */
TitanKeyMakerWrapper.prototype.unique = function () {
  var args = Array.prototype.slice.call(arguments);
  return this.maker.unique.apply(this.maker, args);
};

TitanKeyMakerWrapper.prototype.indexedSync = function (in_indexName,
                                                       in_clazz,
                                                       in_params) {
  if (in_clazz === undefined && in_params === undefined) {
    in_clazz = in_indexName;
    this.maker.indexedSync(in_clazz);
    return this;
  }

  // parse varargs params
  var params = in_params === undefined
             ? []
             : Array.prototype.slice.call(arguments,2);
  params = this.gremlin.java.newArray(
    'com.thinkaurelius.titan.core.Parameter',
    params
  );

  this.maker.indexedSync(in_indexName, in_clazz, params);

  return this;
};

TitanKeyMakerWrapper.prototype.indexed = function (in_indexName,
                                                   in_clazz,
                                                   in_params,
                                                   in_callback) {
  if (in_clazz === undefined && in_params === undefined) {
    in_clazz = in_indexName;
    this.maker.indexed(in_clazz, in_callback);
    return this;
  }

  // parse varargs params
  var params = in_params === undefined
             ? []
             : Array.prototype.slice.call(arguments,2);
  params = this.gremlin.java.newArray(
    'com.thinkaurelius.titan.core.Parameter',
    params
  );

  return this.maker.indexed(in_indexName, in_clazz, params, in_callback);

};

TitanKeyMakerWrapper.prototype.hiddenSync = function () {
  this.maker.hiddenSync();
  return this;
};

TitanKeyMakerWrapper.prototype.hidden = function (in_callback) {
  this.maker.hidden(in_callback);
  return this;
};

TitanKeyMakerWrapper.prototype.unModifiableSync = function () {
  this.maker.unModifiableSync();
  return this;
};

TitanKeyMakerWrapper.prototype.unModifiable = function (in_callback) {
  return this.maker.unModifiable(in_callback);
};

TitanKeyMakerWrapper.prototype.makeStaticSync = function (direction) {
  this.maker.makeStaticSync(direction);
  return this;
};

TitanKeyMakerWrapper.prototype.makeStatic = function (direction, in_callback) {
  return this.maker.makeStatic(direction, in_callback);
};

/**
 * Give a bunch of TitanType instances as parameters; we don't list them
 * because here in JS we're forced to process variable arguments with the
 * special arguments value.
 */
TitanKeyMakerWrapper.prototype.signatureSync = function () {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.signatureSync(types);
  return this;
};

TitanKeyMakerWrapper.prototype.signature = function () {
  var types = Array.prototype.slice.call(
    arguments,
    0,
    arguments.length - 1
  );
  var callback = arguments[arguments.length - 1];
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.signature(types, callback);
  return this;
};

TitanKeyMakerWrapper.prototype.sortKeySync = function () {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.sortKeySync(types);
  return this;
};

TitanKeyMakerWrapper.prototype.sortKey = function () {
  var types = Array.prototype.slice.call(
    arguments,
    0,
    arguments.length - 1
  );
  var callback = arguments[arguments.length - 1];
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  return this.maker.sortKey(types, callback);
};

TitanKeyMakerWrapper.prototype.sortOrderSync = function (order) {
  this.maker.sortOrderSync(order);
  return this;
};

TitanKeyMakerWrapper.prototype.sortOrder = function (order, in_callback) {
  this.maker.sortOrder(order, in_callback);
  return this;
};

TitanKeyMakerWrapper.prototype.make = function (in_callback) {
  return this.maker.make(in_callback);
};

TitanKeyMakerWrapper.prototype.makeSync = function () {
  return this.maker.makeSync();
};
