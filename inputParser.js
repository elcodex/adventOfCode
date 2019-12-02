
const fs = require('fs');
const rawDataFolder = 'data';

const parser = (fileName, splitter) => {
    const data = fs.readFileSync(
        __dirname + '/' + rawDataFolder + '/' + fileName,
        {encoding: 'utf-8'}
    );
    
    return data.toString().trim().split(splitter);
}

module.exports = parser;