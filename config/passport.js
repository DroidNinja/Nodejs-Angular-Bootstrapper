'use strict';

var passport = require('passport');
var _ = require('lodash');
// These are different types of authentication strategies that can be used with Passport. 
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var db = require('./sequelize');
var winston = require('./winston');
var DBUserManager = require('../app/controllers/db/DBUserManager');
var Constants = require('../app/constants/Constants');

//Serialize sessions
passport.serializeUser(function(user, done) {
    console.log("*********serializeUser**********" + user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("*********deserializeUser**********" + id);
    db.User.find({where: {id: id}}).then(function(user){
        if(!user){
            winston.warn('Logged in user not in database, user possibly deleted post-login');
            return done(null, false);
        }
        winston.info('Session: { id: ' + user.id + '');
        done(null, user);
    }).catch(function(err){
        done(err, null);
    });
});

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    db.User.find({ where: { primaryEmail: email }}).then(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (!user.authenticate(password)) {
        done(null, false, { message: 'Invalid password'});
      } else {
        done(null, user);
      }
    }).catch(function(err){
      done(err);
    });
  }
));


// Use facebook strategy
passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'email', 'gender', 'link', 'displayName','locale', 'name', 'timezone', 'updated_time', 'verified'],
        passReqToCallback: true
    },
    function(req,accessToken, refreshToken, profile, done) {

        console.log(profile);
        console.log(accessToken);
        var pictureUrl = "https://graph.facebook.com/"+ profile.id +"/picture?type=large";
        var name = profile.displayName.split(" ");
        var firstName = name[0];
        var lastName = name[1];

        DBUserManager.findOrCreateSocialLoginUser({
                firstName: firstName,
                lastName: lastName,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                gender: profile.gender,
                pictureUrl: pictureUrl,
                provider: Constants.PROVIDER.FACEBOOK
        },
            function (err, user) {
                if(!err)
                {
                    req.user = user;
                    done(null, user);
                }
                else
                    console.log(err);
            });
    }
));

//Use google strategy
passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(profile);
      var name = profile.displayName.split(" ");
      var firstName = name[0];
      var lastName = name[1];
      var pictureUrl = profile._json.image.url.slice(0, -2) + "300";


      DBUserManager.findOrCreateSocialLoginUser({
              firstName: firstName,
              lastName: lastName,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              gender: profile.gender,
              pictureUrl: pictureUrl,
              provider: Constants.PROVIDER.GOOGLE
          },
          function (err, user) {
              if(!err)
              {
                  //req.login(user, function(err) { // I added req.login() here and now deserializeUser is being called and req.user is being set correctly.
                  //    console.log(err);
                  //    if(!err)
                  //    {
                          done(null, user);
                      //}
                  //});

              }
              else
                  console.log(err);
          });
  }
));

module.exports = passport;

