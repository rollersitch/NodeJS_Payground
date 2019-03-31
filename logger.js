const url  = 'http://mylogger.io/log';
const Emitter = require('events');

const events = new Emitter();

const log = message =>  {
    console.log(`Send AJAX to ${url}/qry=${message}`);
    events.emit('messageLogged', {time: new Date().toISOString(), message: message});
};

module.exports.log = log;
module.exports.endPointUrl = url;
module.exports.events = events;
