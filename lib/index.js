
var app = require('./app')
	, config = require('./config')
	, argv = require('optimist')
		.default('port',config.PORT)
		.argv
	, log = require('nlogger').logger(module)
app.listen(argv.port);
log.debug('listening on port: '+argv.port);