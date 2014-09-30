//hljs.initHighlightingOnLoad();

$(document).ready(function () {

    var Language = function (id, name) {
        this.id = id;
        this.name = name;
    };

    var JAVASCRIPT = new Language('javascript', 'JavaScript')

    var ALL_LANGUAGES = [
        new Language('bash', 'Bash'),
        new Language('c', 'C'),
        new Language('coffeescript', 'CoffeeScript'),
        new Language('cpp', 'C++'),
        new Language('csharp', 'C#'),
        new Language('css', 'CSS'),
        new Language('go', 'Go'),
        new Language('groovy', 'Groovy'),
        new Language('haskell', 'Haskell'),
        new Language('java', 'Java'),
        JAVASCRIPT,
        new Language('objectivec', 'Objective-C'),
        new Language('php', 'Php'),
        new Language('python', 'Python'),
        new Language('ruby', 'Ruby'),
        new Language('scala', 'Scala'),
        new Language('sql', 'Sql'),
        new Language('swift', 'Swift')
    ];

    function highlightCode() {
        Prism.highlightAll(true, function () {
        });
    }

    function AppViewModel() {
        this.name = ko.observable();
        this.title = ko.observable();
        this.code = ko.observable('[] + [] // returns \'\'');
        this.availableLanguages = ko.observableArray(ALL_LANGUAGES);
        this.selectedLanguage = ko.observable(JAVASCRIPT.id);
        this.selectedLanguageCssClass = ko.computed(function () {
            return 'language-' + this.selectedLanguage();
        }, this);

        this.submitted = ko.observable(false);
        this.errors = ko.observableArray();

        this.refresh = function refresh() {
            highlightCode();
        };

        this.submit = function submit() {
            var koModel = this;

            this.submitted(true);
            this.errors.removeAll();
            $('#errors').hide();

            var postRequest = {
                name: this.name(),
                code: this.code(),
                title: this.title(),
                language: this.selectedLanguage()
            };
            if (Recaptcha) {
                postRequest['recaptcha_challenge'] = Recaptcha.get_challenge();
                postRequest['recaptcha_response'] = Recaptcha.get_response();
            }
            $.ajax({
                type: 'POST',
                url: '/api/codehorror',
                data: JSON.stringify(postRequest),
                contentType: 'application/json'
            })
                .done(function (data, textStatus, xhr) {
                    var location = xhr.getResponseHeader('Location');
                    window.location.href = location;
                })
                .fail(function (xhr, responseText) {
                    var body = $.parseJSON(xhr.responseText);
                    if (body.errors) {
                        $.each(body.errors, function (i, error) {
                            koModel.errors.push(error);
                        });
                    }
                    else {
                        koModel.errors().push('Technical error... Please try later!');
                    }
                    $('#errors').show();
                    koModel.submitted(false);
                });
        };
    }

    ko.applyBindings(new AppViewModel());
    highlightCode();
});