$(document).ready(function () {

    function AppViewModel() {
        this.totalCodeHorrors = ko.observable();
        this.lastCodeHorrorDate = ko.observable();
        this.worstLanguage = ko.observable();

        var koModel = this;
        $.ajax({
            type: 'GET',
            url: '/api/codehorror/stats'
        })
            .done(function (data, textStatus, xhr) {
                koModel.totalCodeHorrors(data.total);
                koModel.lastCodeHorrorDate(moment(data.latest.creationDate).fromNow());
                koModel.worstLanguage(data.languages[0]._id);
            });
    }

    ko.applyBindings(new AppViewModel());
});