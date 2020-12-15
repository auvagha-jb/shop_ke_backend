const env = require('../env')

const directory = env.DIRECTORY;
const route = (path) => {
    return directory.concat(path);
};

module.exports = route;