const express = require('express');
const HRNumbers = require('human-readable-numbers');

const app = express();
const port = 3000;
const apiRouter = express.Router();

/**
 * Validate passed number before presenting.
 * 
 * @param {number} number
 * @returns {boolean}
 */
function validateNumber(number) {
    if (isNaN(number)) {
        return false;
    }
    var absNumber = Math.abs(number);
    return absNumber === 0 || (absNumber >= 1e-24 && absNumber < 1e27);
}

// hello page
app.get('/', (request, response) => response.send('Hello, server is ready!'));

// api router
app.use('/api', apiRouter);
apiRouter.get('/', (request, response) => {
    let number = parseFloat(request.query.number);
    
    if (validateNumber(number)) {
        response.json({ number, readable: HRNumbers.toHumanString(number) });
    } else {
        response.sendStatus(400);
    }
});

// set the server
app.listen(port, () => console.log(`Server started on port ${port}`));