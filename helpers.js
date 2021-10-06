function getStandardResponse(operation, value) {
    return {
        operation: operation,
        value: value
    };
}

function convertStringArrToNumArr(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let number = Number(arr[i]);
        if (Number.isNaN(number)) {
            return new Error(`Number ${number} is not valid`);
        }
        result.push(number);
    }
    return result;
}

function findMean(arr) {
    const sum = arr.reduce((x, y) => x + y, 0);
    console.log('SUM ' + sum);
    return sum / arr.length;
}

function findMedian(arr) {
    const sorted = arr.slice().sort((x, y) => x - y);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

function createFrequencyCounter(arr) {
    return arr.reduce(function(acc, next) {
        acc[next] = (acc[next] || 0) + 1;
        return acc;
    }, {});
}

function findMode(arr) {
    let freqCounter = createFrequencyCounter(arr);
    let count = 0;
    let mostFrequent;

    for (let key in freqCounter) {
        if (freqCounter[key] > count) {
            mostFrequent = key;
            count = freqCounter[key];
        }
    }
    return +mostFrequent;
}

module.exports = {
    getStandardResponse,
    convertStringArrToNumArr,
    findMean,
    findMedian,
    findMode
};