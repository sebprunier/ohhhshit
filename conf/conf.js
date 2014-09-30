'use strict'

var Conf = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/ohhhshit',
    RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY,
    RECAPTCHA_PRIVATE_KEY: process.env.RECAPTCHA_PRIVATE_KEY
};

module.exports = Conf;
