$(document).ready(function () {

    function AppViewModel() {
        this.totalCodeHorrors = ko.observable();

        var koModel = this;
        $.ajax({
            type: 'GET',
            url: '/api/codehorror/stats'
        })
            .done(function (data, textStatus, xhr) {
                koModel.totalCodeHorrors(data.total)
            });
    }

    ko.applyBindings(new AppViewModel());
});