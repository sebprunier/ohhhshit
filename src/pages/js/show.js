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
        this.name = ko.observable();
        this.title = ko.observable();
        this.code = ko.observable();
        this.language = ko.observable();
        this.creationDate = ko.observable();

        var koModel = this;
        $.ajax({
            type: 'GET',
            url: '/api/codehorror/' + getParameterByName('id')
        })
            .done(function (data, textStatus, xhr) {
                koModel.name(data.name);
                koModel.title(data.title);
                koModel.code(data.code);
                koModel.language(data.language);
                koModel.creationDate(moment(data.creationDate).format('YYYY-MM-DD HH:mm'));
                highlightCode()
            });
    }

    ko.applyBindings(new AppViewModel());
    if (getParameterByName('creation') === "true") {
        $('#messages').show();
    }
});