const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mjml = require('mjml');
const hbs = require('handlebars');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const html = fs.readFileSync('./main.html');
    res.end(html);
});

app.post('/compile', (req, res) => {
    const templateText = req.body.template;
    const hbsInput = req.body.input;

    const handlebarsReplacedMjml = hbs.compile(templateText)(hbsInput);
    const html = mjml(handlebarsReplacedMjml).html;
    res.end(html);
});

app.listen(port);