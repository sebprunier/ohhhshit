//hljs.initHighlightingOnLoad();

$(document).ready(function () {

    var Language = function (id, name) {
        this.id = id;
        this.name = name;
    };

    var JAVASCRIPT = new Language('javascript', 'JavaScript')

    var ALL_LANGUAGES = [
        new Language('actionscript', 'ActionScript'),
        new Language('asciidoc', 'AsciiDoc'),
        new Language('bash', 'Bash'),
        new Language('brainfuck', 'Brainfuck'),
        new Language('coffeescript', 'CoffeeScript'),
        new Language('c', 'C'),
        new Language('c++', 'C++'),
        new Language('clojure', 'Clojure'),
        new Language('csharp', 'C#'),
        new Language('css', 'CSS'),
        new Language('d', 'D'),
        new Language('dart', 'Dart'),
        new Language('delphi', 'Delphi'),
        new Language('dos', 'DOS'),
        new Language('erlang', 'Erlang'),
        new Language('fsharp', 'F#'),
        new Language('go', 'Go'),
        new Language('groovy', 'Groovy'),
        new Language('haml', 'Haml'),
        new Language('haskell', 'Haskell'),
        new Language('html', 'Html'),
        new Language('java', 'Java'),
        JAVASCRIPT,
        new Language('less', 'Less'),
        new Language('lisp', 'Lisp'),
        new Language('lua', 'Lua'),
        new Language('markdown', 'Markdown'),
        new Language('ocaml', 'OCcaml'),
        new Language('objectivec', 'Objective-C'),
        new Language('perl', 'Perl'),
        new Language('php', 'Php'),
        new Language('python', 'Python'),
        new Language('r', 'R'),
        new Language('ruby', 'Ruby'),
        new Language('rust', 'Rust'),
        new Language('scala', 'Scala'),
        new Language('scheme', 'Scheme'),
        new Language('smalltalk', 'Smalltalk'),
        new Language('sql', 'Sql'),
        new Language('stylus', 'Stylus'),
        new Language('swift', 'Swift'),
        new Language('thrift', 'Thrift'),
        new Language('typescript', 'Typescript'),
        new Language('vbnet', 'VB.Net'),
        new Language('vbscript', 'VBScript'),
        new Language('x86asm', 'x86 Assembly'),
        new Language('xml', 'Xml')
    ];

    function highlightCode() {
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    }

    function AppViewModel() {
        this.code = ko.observable('[] + [] // returns \'\'');
        this.availableLanguages = ko.observableArray(ALL_LANGUAGES);
        this.selectedLanguage = ko.observable(JAVASCRIPT.id);

        this.refresh = function refresh() {
            highlightCode();
        }
    }

    // Activates knockout.js
    ko.applyBindings(new AppViewModel());
    hljs.configure({languages: []});
    highlightCode();
});