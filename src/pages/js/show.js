//hljs.initHighlightingOnLoad();

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
        this.languageCssClass = ko.computed(function () {
            return 'language-' + this.language();
        }, this);

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
                highlightCode()
            });
    }

    ko.applyBindings(new AppViewModel());
    if (getParameterByName('creation') === "true") {
        $('#messages').show();
    }
})
;