const express = require('express');
const bodyParser = require('body-parser');
const Engine = require('json-rules-engine').Engine;

const app = express();
const port = process.argv[2] || 3000;
app.use(bodyParser.json());
app.listen(port);

let eng = new Engine();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {

    let fact = req.body;
    eng
        .run(fact)
        .then(events => {
            events.map(event => res.send({
                messge: event.params.message
            }));
        })
        .then(res.send({
            messge: "Rules passed!"
        }))
        .catch(err => console.log(err.stack));

});

eng.addRule({
    conditions: {
        any: [{
            all: [{
                fact: 'gameDuration',
                operator: 'equal',
                value: 40
            }, {
                fact: 'personalFoulCount',
                operator: 'greaterThanInclusive',
                value: 5
            }]
        }, {
            all: [{
                fact: 'gameDuration',
                operator: 'equal',
                value: 48
            }, {
                fact: 'personalFoulCount',
                operator: 'greaterThanInclusive',
                value: 6
            }]
        }]
    },
    event: {
        type: 'fouledOut',
        params: {
            message: 'Player has fouled out!'
        }
    }
});