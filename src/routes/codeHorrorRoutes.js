'use strict';

var CodeHorrorRoutes = function (codeHorrorService) {

    var Recaptcha = require('recaptcha').Recaptcha;

    var conf = require('../../conf/conf');

    var _iAmFeelingLucky = function (req, res) {
        codeHorrorService.findOneRandomly(function (codeHorror) {
            if (codeHorror) {
                res.status(200).send(codeHorror);
            }
            else {
                res.status(404).send('Not found');
            }
        });
    };

    var _get = function (req, res) {
        var id = req.param('id');
        if (!id || id.length !== 24) {
            res.status(400).send('Wrong or missing id parameter');
        } else {
            codeHorrorService.findById(id, function (codeHorror) {
                if (codeHorror) {
                    res.status(200).send(codeHorror);
                }
                else {
                    res.status(404).send('Not found');
                }
            });
        }
    };

    var _create = function (req, res) {
        var code = req.body;
        var validationErrors = [];
        if (code.name && code.name.length > 80) {
            validationErrors.push('Your name must have a maximum of 80 characters')
        }
        if (!code.title) {
            validationErrors.push('The title is required')
        }
        if (code.title && code.title.length > 80) {
            validationErrors.push('The title must have a maximum of 80 characters')
        }
        if (!code.code) {
            validationErrors.push('The code example is required')
        }
        if (code.code && code.code.length < 10) {
            validationErrors.push('The code example must have a minimum of 10 characters')
        }
        if (code.code && code.code.length > 6000) {
            validationErrors.push('The code example must have a maximum of 6000 characters')
        }

        if (validationErrors.length > 0) {
            res.status(400).json({
                errors: validationErrors
            }).send();
        } else {
            _verifyCaptcha(req, res, function (success) {
                if (!success) {
                    res.status(400).send({
                        errors: ['Incorrect Captcha value!']
                    });
                } else {
                    codeHorrorService.insert(req.connection.remoteAddress, code, function (codeHorror) {
                        res.status(201)
                            .header('Location', '/show.html?id=' + codeHorror['_id'] + '&creation=true')
                            .send('Created');
                    });
                }
            });
        }
    };

    // TODO create a captchaService
    var _verifyCaptcha = function (req, res, callback) {
        if (conf.ENV === 'production') {
            var data = {
                remoteip: req.connection.remoteAddress,
                challenge: req.body.recaptcha_challenge,
                response: req.body.recaptcha_response
            };

            var recaptcha = new Recaptcha(conf.RECAPTCHA_PUBLIC_KEY, conf.RECAPTCHA_PRIVATE_KEY, data);

            recaptcha.verify(function (success, error_code) {
                callback(success);
            });

        } else {
            callback(true);
        }
    };

    return {
        iAmFeelingLucky: _iAmFeelingLucky,
        get: _get,
        create: _create
    };

};

module.exports = CodeHorrorRoutes;
