const path = require('path');
const fs = require('fs');

let children;
let str;

function buildImports() {
    return children.map(child => `import * as ${child.module} from './${child.filename}';`).join('\n')
}

function buildExport() {
    const modules = children.map(child => `    ${child.module}`).join(',\n');
    return `export default Object.assign({}, \n${modules}\n);`;
}

module.exports = function(dir) {
    const sourceDir = path.resolve(process.cwd(), dir);

    children = fs.readdirSync(sourceDir);
    children = children
        .map(child => {
            return {
                module: child.replace('.js', '') + 'Actions',
                filename: child, 
            }
        })
        .filter(child => !child.filename.includes('index.js'))

    str = buildImports() + '\n\n' + buildExport();

    fs.writeFileSync(path.resolve(sourceDir, 'index.js'), str);
}

