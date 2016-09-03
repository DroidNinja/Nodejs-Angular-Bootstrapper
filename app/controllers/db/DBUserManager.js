'use strict';

/**
 * Module dependencies.
 */
var db = require('../../../config/sequelize');
var crypto = require('crypto');
var Constants = require('../../constants/Constants');

(function() {
    var DBUserManager;

    DBUserManager = (function() {
        function DBUserManager() {}

        DBUserManager.prototype.create = function(profile, done) {

            db.sequelize.transaction(function (t) {

                var salt = makeSalt();
                var hashedPass = encryptPassword(profile.password, salt);

                // chain all your queries here. make sure you return them.
                return db.User.create({
                        firstName : profile.firstName,
                        lastName: profile.lastName,
                        displayName: profile.displayName,
                        gender: (profile.gender==="")?'OTHER':profile.gender,
                        salt: salt,
                        primaryEmail: profile.email,
                        hashedPassword: hashedPass,
                        password: profile.password,
                        pictureUrl: profile.pictureUrl,
                        isVerified: false
                    },
                    {transaction: t}).then(function (result) {

                    return db.UserAuth.create({
                        UserId: result.id,
                        providerEmail: profile.email,
                        provider: profile.provider,
                        isActive: 1
                    },{transaction: t});
                });

            }).then(function (result) {

                db.User.find({where : { id: result.UserId }}).then(function(user){
                    done(null, user);
                }).catch(function(err){
                    done(err,null);
                });

            }).catch(function (err) {

                console.error(err);
                console.error(err.name);

                done(err, null);
            });
        };

        DBUserManager.prototype.findOrCreateSocialLoginUser = function(profile, done) {

            db.UserAuth.findAll({where: {providerEmail: profile.email}}).then(function (users) {
                if (!users || users.length==0) {

                    DBUserManager.prototype.create(profile, function (err, user) {

                            if (!err) {
                                done(null, user);
                            }
                            else {
                                throw Constants.ERROR_TYPE.UNABLE_TO_ADD_USER;
                            }
                        }
                    );
                } else {

                    var isProviderExists = false;
                    for(var index=0;index< users.length;index++) {

                        if (users[index].provider == profile.provider) {
                            //If user already exists, but with different provider
                            //Link social account
                            isProviderExists=true;
                            DBUserManager.prototype.getUserById(users[index].UserId, function (err, user) {
                                if (!err) {
                                    done(null, user);
                                }
                                else {
                                    done(Constants.ERROR_TYPE.UNABLE_TO_ADD_USER, null);
                                }
                            });
                            break;
                        }
                    }

                    if(!isProviderExists) {
                        DBUserManager.prototype.addSocialUser(profile, users[0].UserId, function (err, user) {
                            if (!err) {
                                done(null, user);
                            }
                            else {
                                done(err, null);
                            }
                        });
                    }
                }
            }).catch(function (err) {
                done(err, null);
            });
        };

        DBUserManager.prototype.getUserById = function(userId, done) {
            db.User.find({where : { id: userId }}).then(function(user){
                done(null, user);
            }).catch(function(err){
                done(err,null);
            });
        };

        var makeSalt = function() {
            return crypto.randomBytes(16).toString('base64');
        };

        var authenticate = function(plainText, salt, hashedPassword){
            return this.encryptPassword(plainText, salt) === hashedPassword;
        };

        var encryptPassword = function(password, salt) {
            if (!password || !salt) {
                return '';
            }
            salt = new Buffer(salt, 'base64');
            return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        };

        DBUserManager.prototype.addSocialUser = function(userObj, userId, done)
        {
            db.sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return db.User.update({
                        firstName: userObj.firstName,
                        lastName: userObj.lastName,
                        gender: userObj.gender,
                        pictureUrl: userObj.profileImageUrl
                    },{
                        where: { id: userId }
                    },
                    {transaction: t}).then(function (result) {

                    return db.UserAuth.create({
                        UserId: userId,
                        providerEmail: userObj.email,
                        provider: userObj.provider,
                        isActive: 1
                    },{transaction: t});
                });


            }).then(function (result) {

                db.User.find({where : { id: result.UserId }}).then(function(user){
                    done(null, user);
                }).catch(function(err){
                    done(Constants.ERROR_TYPE.UNABLE_TO_FETCH_USER,null);
                });

            }).catch(function (err) {

                console.error(err);

                done(Constants.ERROR_TYPE.UNABLE_TO_ADD_USER, null);
            });
        };


        return DBUserManager;

    })();

    module.exports = DBUserManager.prototype;

}).call(this);