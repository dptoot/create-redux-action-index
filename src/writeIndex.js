const path = require('path');
const fs = require('fs');
const log = require('./log');
const indentString = require('indent-string');

let children;
let str;

function buildImports() {
    return children.map(child => `import * as ${child.module} from './${child.filename}';`).join('\n')
}

function buildExport(options) {
    const modules = children.map(child => indentString(child.module, options.indent)).join(',\n');
    return `export default Object.assign({}, \n${modules}\n);`;
}

module.exports = function(dir, options) {
    log(`processing ${dir}`);
    const sourceDir = path.resolve(process.cwd(), dir);

    children = fs.readdirSync(sourceDir);
    children = children
        .map(child => {
            return {
                module: child.replace('.js', options.suffix),
                filename: child, 
            }
        })
        .filter(child => !child.filename.includes('index.js'))

    str = buildImports(options) + '\n\n' + buildExport(options);

    fs.writeFileSync(path.resolve(sourceDir, 'index.js'), str);
    log(`generated redux action index file in ${dir}`);
}
