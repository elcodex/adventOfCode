
const fs = require('fs');
const rawDataFolder = 'data';

const parser = (fileName, splitter) => {
    const data = fs.readFileSync(
        __dirname + '/' + rawDataFolder + '/' + fileName,
        {encoding: 'utf-8'}
    );
    if (splitter) {
        return data.toString().trim().split(splitter);
    }
    return data.toString().trim();
}

module.exports = parser;