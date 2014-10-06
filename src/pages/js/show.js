$(document).ready(function () {

    function getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results == null ? 'random' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    function highlightCode() {
        Prism.highlightAll(true, function () {
        });
    }

    function configureDisqus(id, title) {
        var disqus_shortname = 'ohhhshit';
        var disqus_identifier = id;
        var disqus_title = title;
        var disqus_url = 'http://www.ohhhshit.com/show.html?id=' + id;

        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function () {
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    }

    function AppViewModel() {
        this.name = ko.observable();
        this.title = ko.observable();
        this.code = ko.observable();
        this.language = ko.observable();
        this.creationDate = ko.observable();

        var koModel = this;
        var idParam = getParameterByName('id');
        $.ajax({
            type: 'GET',
            url: '/api/codehorror/' + idParam
        })
            .done(function (data, textStatus, xhr) {
                if (idParam === 'random') {
                    var location = xhr.getResponseHeader('Location');
                    window.location.href = location;
                } else {
                    document.title = data.title;
                    koModel.name(data.name);
                    koModel.title(data.title);
                    koModel.code(data.code);
                    koModel.language(data.language);
                    koModel.creationDate(moment(data.creationDate).format('YYYY-MM-DD HH:mm'));
                    highlightCode();
                    configureDisqus(data._id, data.title);
                }
            });
    }

    ko.applyBindings(new AppViewModel());
    if (getParameterByName('creation') === 'true') {
        $('#messages').show();
    }
});