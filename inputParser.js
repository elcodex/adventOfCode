
const fs = require('fs');
const rawDataFolder = 'data';

const parser = fileName => {
    const data = fs.readFileSync(
        __dirname + '/' + rawDataFolder + '/' + fileName,
        {encoding: 'utf-8'}
    );
    
    return data.toString().split('\n');
}

module.exports = parser;