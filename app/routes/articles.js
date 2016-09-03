'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
articles = require('../../app/controllers/articles');

module.exports = function(app, express) {

    var api = express.Router();

// Article Routes
    api.group("/api/v1", function (router) {

        router.get("/login", function(req, res) {
            res.send('Audi, BMW, Mercedes')
        });

        router.route('/articles')
        .get(users.requiresLogin,articles.all)
        .post(users.requiresLogin, articles.create);


        router.route('/articles/:articleId')
        .get(articles.show)
        .put(users.requiresLogin, articles.hasAuthorization, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorization, articles.destroy);

 //Finish with setting up the articleId param
 //Note: the articles.article function will be called everytime then it will call the next function.
        router.param('articleId', articles.article);
    });

    //


    //api.get('/hello',function(req, res) {
    //    res.send('Audi, BMW, Mercedes')
    //});
    //
    //api.use('/articles', articles);
    app.use(api);
};

