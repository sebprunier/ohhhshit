$(document).ready(function () {

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "random" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function highlightCode() {
        Prism.highlightAll(true, function () {
        });
    }

    function AppViewModel() {
        this.codes = ko.observableArray();

        var koModel = this;
        $.ajax({
            type: 'GET',
            url: '/api/codehorror/latest'
        })
            .done(function (data, textStatus, xhr) {
                $.each(data, function (i, code) {
                    koModel.codes.push({
                        url: '/show.html?id=' + code._id,
                        name: code.name,
                        title: code.title,
                        code: code.code,
                        language: code.language,
                        creationDate: moment(code.creationDate).format('YYYY-MM-DD HH:mm')
                    });
                });
                highlightCode()
            });
    }

    ko.applyBindings(new AppViewModel());
});