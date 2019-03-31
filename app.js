const logger = require('./logger');
const EventEmitter = require('events');
const http = require('http');

const emitter = new EventEmitter();

logger.events.on('messageLogged',(ev) => console.log(ev));

logger.log('Hello');

const server = http.createServer((req,resp) => {
    if(req.url === '/'){
        resp.write('Hello');
        resp.end();
    }

    if(req.url === '/api/courses'){
        resp.write(JSON.stringify([1,2,3]));
        resp.end();
    }
});


server.listen(3000);


