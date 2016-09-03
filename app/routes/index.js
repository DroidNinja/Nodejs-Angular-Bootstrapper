'use strict';

module.exports = function(app, express)  {
// Home route
var index = require('../../app/controllers/index');
app.get('/home', index.render);

    app.get('/', index.render);
};

