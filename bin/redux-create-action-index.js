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
    .options({
        suffix: {
            alias: 's',
            default: 'Actions',
            description: 'suffix to add to the import module name', 
            type: 'string',
        }
    })
    .help()
    .argv

writeIndexes(argv._, argv);
