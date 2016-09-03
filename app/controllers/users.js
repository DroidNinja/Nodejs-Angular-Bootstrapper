'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');
var DBUserManager = require('./db/DBUserManager');
var Constants = require('../constants/Constants');
/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/home');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up'
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    console.log('Logout: { id: ' + req.user.id + ', username: ' + req.user.username + '}');
    req.logout();
    return res.send({status : true, message : 'User logout successfully.'});
};

/**
 * Session
 */
exports.session = function(req, res) {
    return res.send({status : true, message : 'User login successfully.'});
   // res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var message = null;

    var user = {};
    user.displayName = req.body.name;
    var name = req.body.name.split(" ");
    user.firstName = name[0];
    user.lastName = name[1];
    user.email = req.body.email;
    user.password = req.body.password;
    user.gender = "";
    user.provider = Constants.PROVIDER.EMAIL;

    db.UserAuth.find({where: {providerEmail: user.email}}).then(function (user) {
        if (!user) {
            DBUserManager.create(user, function (err, user) {
                if (err) {
                    res.send({status : false, message : 'Unable to create user!'});
                }
                else {
                    req.login(user, function (err) {
                        if (err) {
                            return next(err);
                        }
                        return res.send({status: true, message: 'User signup successfully.'});
                        // res.redirect('/');
                    });
                }
            });
        }else {
            res.send({status : false, message : 'User already exists!'});
        }
    }).catch(function (err) {
        done(err, null);
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    db.User.find({where : { id: id }}).then(function(user){
      if (!user) {
          return next(new Error('Failed to load User ' + id));
      }
      req.profile = user;
      next();
    }).catch(function(err){
      next(err);
    });
};

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.profile.id !== req.user.id) {
      return res.status(401).send('User is not authorized');
    }
    next();
};
