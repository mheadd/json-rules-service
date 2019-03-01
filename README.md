# Simple Rules Engine

Simple example using [express](https://expressjs.com/) and [json-rules engine](https://github.com/cachecontrol/json-rules-engine) (borrows heavily from module docs)

Invoke thusly:

```bash
curl -s -X POST http://127.0.0.1:3000/ -d '{ "personalFoulCount": 6, "gameDuration": 40 }' -H 'Content-type: application/json'

```

Next steps;

* Build out rule set
* Store rules in JSON format in CouchDB or other backend data store?