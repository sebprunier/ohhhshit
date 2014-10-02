$(document).ready(function () {

    function AppViewModel() {
        this.totalCodeHorrors = ko.observable();
        this.lastCodeHorrorDate = ko.observable();
        this.worstLanguage = ko.observable();

        var koModel = this;

        function drawLanguageChart(languages) {
            var languagesData = languages.map(function (val) {
                return [val._id, val.total];
            });

            $('#languageChart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 1,//null,
                    plotShadow: false
                },
                title: {
                    text: null
                },
                tooltip: {
                    pointFormat: '{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Horrifying percentage',
                        data: languagesData
                    }
                ]
            });
        }

        $.ajax({
            type: 'GET',
            url: '/api/codehorror/stats'
        })
            .done(function (data, textStatus, xhr) {
                koModel.totalCodeHorrors(data.total);
                koModel.lastCodeHorrorDate(moment(data.latest.creationDate).fromNow());
                koModel.worstLanguage(data.languages[0]._id);
                drawLanguageChart(data.languages);
            });
    }

    ko.applyBindings(new AppViewModel());
});