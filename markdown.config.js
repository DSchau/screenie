const path = require('path');
const fs = require('fs');

module.exports = {
  transforms: {
    PACKAGES(content, options) {
      const base = path.resolve('packages');
      const packages = fs.readdirSync(path.resolve('packages'))
        .filter(pkg => !/^\./.test(pkg))
        .map(pkg => ([pkg, fs.readFileSync(path.join(base, pkg, 'README.md'), 'utf8')]))
        .map(([pkg, md]) => {
          const [,, description] = md.split('\n').filter(line => line && line.length > 0);
          return `- [${pkg}](./packages/${pkg}) ${description}`;
        })
        .join('\n');
      return packages;
    }
  }
};
