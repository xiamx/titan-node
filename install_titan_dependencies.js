#!/bin/sh

rm -R ./target/dependency
mkdir -p ./target/dependency

echo "Cloning Titan"
git clone git@github.com:avieth/titan.git
cd titan
echo "Packaging via Maven"
mvn -DskipTests package

cp -R ./lib/* ../target/dependency/

echo "Cleaning titan repo via Maven"
mvn clean

echo "All done."
