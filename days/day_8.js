const parser = require('../inputParser.js');


const getLayer = (str, width) => {
    let data = [];
    for (let pos = 0; pos < str.length; pos += width) {
        data.push(str.substring(pos, pos + width));
    }
    
    return {
        data,
        count: (chr) => 
            data.reduce((count, line) => 
                count + line.split(chr).length - 1,
            0)
    }
}

const WIDTH = 25;
const HEIGHT = 6;

const getAllLayers = inputString => {
    const layerLength = WIDTH * HEIGHT;

    let layers = [];
    for (let pos = 0; pos < inputString.length; pos += layerLength) {
        layers.push(getLayer(inputString.substring(pos, pos + layerLength), WIDTH));
    }
    return layers;
}

const getLayerWithMinZeroes = layers => {
    let minZeroes = WIDTH * HEIGHT;
    let layer = {};
    layers.forEach(currentLayer => {
        const layerZeroes = currentLayer.count('0');
        if (layerZeroes < minZeroes) {
            minZeroes = layerZeroes;
            layer = currentLayer;
        }
    });
    return layer;
}

const TRANSPARENT = '2';
const renderImage = layers => {
    let img = layers[0].data.map(line => line.split(''));
    layers.forEach(({data}) => {
        data.forEach((line, i) => {
            line.split('').forEach((chr, j) => {
                if (img[i][j] === TRANSPARENT) {
                    img[i][j] = chr;
                }
            })
        });
    });
    return img.map(line => line.join(''));
}

const input = parser('day_8.txt');
const layers = getAllLayers(input);
const layerWithMinZeroes = getLayerWithMinZeroes(layers);

//console.log(layerWithMinZeroes);
console.log(layerWithMinZeroes.count('1') * layerWithMinZeroes.count('2'));

const img = renderImage(layers);
console.log(img.map(line => line.replace(/0/g, ' ')));