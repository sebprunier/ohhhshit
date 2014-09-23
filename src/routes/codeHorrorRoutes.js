'use strict';

var CodeHorrorRoutes = function (codeHorrorService) {

    var _iAmFeelingLucky = function (req, res) {
        codeHorrorService.findOneRandomly(function (codeHorror) {
            if (codeHorror) {
                res.status(200).json(codeHorror);
            }
            else {
                res.status(404).send('Not found');
            }
        });
    };

    return {
        iAmFeelingLucky: _iAmFeelingLucky
    };

};

module.exports = CodeHorrorRoutes;
