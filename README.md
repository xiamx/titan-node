titan-node
==========

Wrapper around [gremlin-node](https://github.com/inolen/gremlin-node) to provide out of the box support for [Titan graph database](https://github.com/thinkaurelius/titan).

gremlin-node does not include the jar files for Titan, nor does it make any assumptions based on using Titan as a backend. This project customizes gremlin-node to make it easier to get up and running:

 * includes the appropriate Java jar files for Titan 0.4.1 in the classpath
 * adds Titan-specific enums and data types to the gremlin object (e.g. Geo and Geoshape)
 * adds `loglevel` option to the gremlin constructor to control Titan verbosity. see [logback's documentation](http://logback.qos.ch/manual/architecture.html) for all available levels
 * passes the recommended runtime flags to the JVM instance instantiated by gremlin-node

## Installation

```bash
$ npm install titan-node
```

## Quick start

With this package you can control a Titan Java instance inside node, with
minimal exposure to the Java bridge! Your entry point is the Titan constructor,
which demands configuration options, and allows you to open a graph. With the
graph (a TitanGraphWrapper instance) you can start working with gremlin via
the gremlin-node Java wrapper.

```javascript
var Titan = require('titan-node');
var titan = new Titan({
  titanConfig : {
    // Titan options; maybe something like
    // storage : {
    //   backend : 'cassandra',
    //   hostname : 'localhost'
    // }
  },
  gremlinConfig : {
    // Gremlin options.
  }
});

// Graph is a TitanGraphWrapper, which is a GraphWrapper from gremlin-node
// with some extra goodies for Titan specific things like making keys or labels.
var graph = titan.openSync();
```
