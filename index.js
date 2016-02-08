var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

    
app.set('views', __dirname + '/views');
// app.set('ige', __dirname + '/ige');

app.use('/ige',  express.static(__dirname + '/ige'));

// app.use(express.static(__dirname + '/ige'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


var route = require('./routes.js').addRoutes(app);


