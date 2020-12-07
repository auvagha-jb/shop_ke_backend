const env = require('../env')

const directory = env.DIRECTORY;
const router = (path) => {
    return directory.concat(path);
};

module.exports = router;