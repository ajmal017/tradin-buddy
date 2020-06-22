

$(document).ready(function(){
    var error = false
    $('#button-ticker-search').click(function() {
        makeAPICall(error, 'TIME_SERIES_DAILY_ADJUSTED');
    });
    $('#buy-share-total').change(function() {
        calculateSum('B');
    });
    $('#buy-share-price').change(function() {
        calculateSum('B');
    });
    $('#sell-share-total').change(function() {
        calculateSum('S');
    });
    $('#sell-share-price').change(function() {
        calculateSum('S');
    });
    $('#input-bid-order-button').click(function() {
        alert('TODO: integrate IBKR API')
        var num = $('#buy-share-total').val();
        var price = $('#buy-share-price').val();
        var total = num*price;
        
    });
    $('#input-ask-order-button').click(function() {
        alert('TODO: integrate IBKR API')
        var num = $('#sell-share-total').val();
        var price = $('#sell-share-price').val();
        var total = num*price;
    });
    
});

function calculateSum(orderType) {
    if(orderType == 'B') {
        // Buy order
        var num = $('#buy-share-total').val();
        var price = $('#buy-share-price').val();
        var total = num*price;
        if(total != 0) {
            // TODO: round to nearest double digits
            total = (Math.ceil(total*100)/100).toFixed(2)
            $('#buy-total-label').text(`Total: ${total} $`);
        }
    } else {
        // Sell order
        var num = $('#sell-share-total').val();
        var price = $('#sell-share-price').val();
        var total = num*price;
        if(total != 0) {
            // TODO: round to nearest double digits
            total = (Math.ceil(total*100)/100).toFixed(2)
            $('#sell-total-label').text(`Total: ${total} $`);
        }
    }
}
function getApiKey() {
    const FILE_CONTENT = $("#creds-content").contents().find('pre').text();
    const start = FILE_CONTENT.indexOf('ALPHA_VANTAGE_KEY=') +18;
    const end = start+16
    const AV_KEY = FILE_CONTENT.substring(start, end)
    alert(AV_KEY)
    return AV_KEY;
}

function makeAPICall(error, interval) {
    if($('#inverval-button')) {
        $('#inverval-button').empty();
    }
    
    $('#error-container').empty();
    const API_KEY = getApiKey(); 
    const BASE_URL = 'https://www.alphavantage.co/query?'
    const SECTION = interval
    var ticker = $("#ticker-search-field").val();
    if(SECTION == 'TIME_SERIES_INTRADAY') {
        var apiCall = `${BASE_URL}function=${SECTION}&symbol=${ticker}&interval=1min&outputsize=compact&apikey=${API_KEY}`
    } else if (SECTION == 'TIME_SERIES_DAILY_ADJUSTED'){
        var apiCall = `${BASE_URL}function=${SECTION}&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
    } else {
        var apiCall = `${BASE_URL}function=${SECTION}&symbol=${ticker}&apikey=${API_KEY}`
    }
    
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(apiCall)
    .then(function(response) {
        error = false;
        return response.json();
      }
    ).catch((error) => {
        console.log(error)
        $('#error-container').append('<div class="alert alert-danger" role="alert">An error occurer: Invalid call to API or weak connection.</div>');
        error = true
    }).then(
      function(data) {
        console.log(data)
        switch(interval) {
            case 'TIME_SERIES_INTRADAY':
                for (var key in data['Time Series (1min)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (1min)'][key]['1. open']);
                }
                break;
            case 'TIME_SERIES_DAILY_ADJUSTED':
                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                }
                break;
            case 'TIME_SERIES_WEEKLY_ADJUSTED':
                for (var key in data['Weekly Adjusted Time Series']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Weekly Adjusted Time Series'][key]['1. open']);
                }
                break;
            case 'TIME_SERIES_MONTHLY_ADJUSTED':
                for (var key in data['Monthly Adjusted Time Series']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Monthly Adjusted Time Series'][key]['1. open']);
                }
                break;
        }
        if(stockChartXValuesFunction.length == 0) {
            $('#error-container').append(`<div class="alert alert-danger" role="alert">No stock with the symbol ${ticker} was not found.</div>`)
            error = true
        } else {
            console.log($('#myChart'))
            renderGraph(stockChartXValuesFunction, stockChartYValuesFunction, ticker,interval);
            error = false;
        }
      }
    ).catch((error) => {
        console.log(error)
        $('#error-container').append('<div class="alert alert-danger" role="alert">An error occured: Invalid call to API or weak connection.</div>')
        error = true;
    });
    $("#stock-graph-container").prepend('<div id="inverval-button" class="btn-group" role="group" aria-label="interval"><button id="intraday-button" type="button" class="btn btn-secondary">Intraday</button><button id="daily-button" type="button" class="btn btn-secondary">Daily</button><button id="weekly-button" type="button" class="btn btn-secondary">Weekly</button><button id="monthly-button" type="button" class="btn btn-secondary">Monthly</button></div>');
    
    $("#intraday-button").click(function() {
        makeAPICall(error, 'TIME_SERIES_INTRADAY');
    });
    $("#daily-button").click(function() {
        makeAPICall(error, 'TIME_SERIES_DAILY_ADJUSTED');
    });
    $("#weekly-button").click(function() {
        makeAPICall(error, 'TIME_SERIES_WEEKLY_ADJUSTED');
    });
    $("#monthly-button").click(function() {
        makeAPICall(error, 'TIME_SERIES_MONTHLY_ADJUSTED');
    });
}
function renderGraph(x,y, ticker, freq) {
    var canvas = document.getElementById('myChart')
    var ctx = canvas.getContext('2d');
    if(!isCanvasBlank(canvas)) {
        canvas.remove();
        $('#stock-graph-container').append('<canvas id="myChart" height="100px;"></canvas>');
        canvas = document.getElementById('myChart')
        ctx = canvas.getContext('2d');
    }
    
    const title = setChartTitle(freq)

    chart = new Chart(ctx, {

    type: 'line',

    data: {
        labels: x.reverse(),
        datasets: [{
            label: ticker,
            backgroundColor: '#49d6eb',
            borderColor: '#49d6eb',
            pointBackgroundColor: '#287d8a',
            data: y.reverse()
        }]
    },

    options: {
        title: {
            display: true,
            text: title,
            fontFamily: "'Cantarell', 'sans-serif'",
            fontSize: 20
        }
    }
    });
}

function isCanvasBlank(canvas) {
    return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some(channel => channel !== 0);
  }

function setChartTitle(freq) {
    var title = ''
    switch(freq) {
        case 'TIME_SERIES_INTRADAY':
                title = 'Intradaily Intervals'
                break;
            case 'TIME_SERIES_DAILY_ADJUSTED':
                title = 'Daily Intervals'
                break;
            case 'TIME_SERIES_WEEKLY_ADJUSTED':
                title = 'Weekly Intervals'
                break;
            case 'TIME_SERIES_MONTHLY_ADJUSTED':
                title = 'Monthly Intervals'
                break;
    }
    return title;
}