const express = require('express');
const { getStandardResponse, convertStringArrToNumArr, findMean, findMedian, findMode } = require('./helpers');
const ExpressError = require('./express-error');

const app = express();
app.use(express.json());

let NUMS_ARR;

app.use((req, res, next) => {
    try {
        if (!req.query.nums) throw new ExpressError('Please pass the list of numbers.', 400);
        let numsArrAsStrings = req.query.nums.split(',');
        NUMS_ARR = convertStringArrToNumArr(numsArrAsStrings);
        next();
    } catch (e) {
        next(e);
    }
});

app.get('/mean', (req, res, next) => {
    res.send(getStandardResponse('mean', findMean(NUMS_ARR)));
});

app.get('/median', (req, res, next) => {
    res.send(getStandardResponse('median', findMedian(NUMS_ARR)));
});

app.get('/mode', (req, res, next) => {
    res.send(getStandardResponse('mode', findMode(NUMS_ARR)));
});

app.use((req, res, next) => {
    const e = new ExpressError('Page not found', 404);
    next(e);
});

app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message;
    return res.status(status).json({ error: { message, status } });
});

app.listen(3000, function() {
    console.log('App on port 3000');
});