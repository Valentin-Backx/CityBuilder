exports.addRoutes = function (app) {
    app.get('/', function(req, res){
        res.render('index.jade');
    });

    return this;
}
