const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

routerName = require('./routes/sampleRoute');
app.use('/sampleUrl', routerName);

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// npm install
// npm install body-parser
// npm install pg