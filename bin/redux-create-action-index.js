#! /usr/bin/env node
const yargs = require('yargs');
const writeIndexes = require('../src/index');
const argv = yargs
    .demand(1)
    .options({
        indent: {
            alias: 'i',
            default: 4,
            description: 'set number of spaces to indent', 
            type: 'number',
        }
    })
    .help()
    .argv

writeIndexes(argv._, argv);
