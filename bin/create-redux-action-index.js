#! /usr/bin/env node
const yargs = require('yargs');
const writeIndex = require('../index');
const argv = yargs
    .demand(1)
    .help()
    .argv

argv._.forEach(writeIndex);