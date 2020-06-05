

$(document).ready(function(){
    var error = false
    $('#button-ticker-search').click(function() {

        $('#error-container').empty();
        const API_KEY = getApiKey(); 
        const BASE_URL = 'https://www.alphavantage.co/query?'
        const SECTION = 'TIME_SERIES_DAILY_ADJUSTED'
        var ticker = $("#ticker-search-field").val();
        var apiCall = `${BASE_URL}function=${SECTION}&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(apiCall)
        .then(function(response) {
            error = false;
            return response.json();
          }
        ).catch(() => {
            $('#error-container').append('<div class="alert alert-danger" role="alert">An error occurer: Invalid call to API or weak connection.</div>');
            error = true
        }).then(
          function(data) {
            console.log(data);
  
            for (var key in data['Time Series (Daily)']) {
              stockChartXValuesFunction.push(key);
              stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            }
            
            console.log(stockChartXValuesFunction);
            console.log(stockChartYValuesFunction)
            if(stockChartXValuesFunction.length == 0) {
                $('#error-container').append(`<div class="alert alert-danger" role="alert">No stock with the symbol ${ticker} was found.</div>`)
                error = true
            }
            // TODO: make graph
            error = false;
          }
        ).catch(() => {
            $('#error-container').append('<div class="alert alert-danger" role="alert">An error occured: Invalid call to API or weak connection.</div>')
            error = true;
        });
    });
});

function getApiKey() {
    const FILE_CONTENT = $("#creds-content").contents().find('pre').text();
    const start = FILE_CONTENT.indexOf('=') +1;
    const end = start+16
    const AV_KEY = FILE_CONTENT.substring(start, end)
    return AV_KEY;
}
