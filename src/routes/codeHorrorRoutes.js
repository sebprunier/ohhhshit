'use strict';

var CodeHorrorRoutes = function (codeHorrorService) {

    var _iAmFeelingLucky = function (req, res) {
        codeHorrorService.findOneRandomly(function (codeHorror) {
            res.status(200).json(codeHorror);
        });
    };

    return {
        iAmFeelingLucky: _iAmFeelingLucky
    };

};

module.exports = CodeHorrorRoutes;
