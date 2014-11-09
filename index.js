
'use strict';

var app = require('./lib/app');
app.get('/', function talk(request, response) {
	response.status(200).send();
});
app.listen(process.env.PORT || 5000);
