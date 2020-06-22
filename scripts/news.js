$(document).ready(function(){
    var error = false
    $('#search-button').click(function() {
        // TODO: set terms properly
        var country = $('#country').val();
        var category = $('#categorie').val();
        var q = $('#search-field').val();
        makeAPICall(error, country, category, q)
    });
});

function getApiKey() {
    const FILE_CONTENT = $("#creds-content").contents().find('pre').text();
    const start = FILE_CONTENT.indexOf('GOOGLE_NEWS_API=') +16;
    const end = start+32
    const NEWS_KEY = FILE_CONTENT.substring(start, end)
    return NEWS_KEY;
}

function makeAPICall(error, country, category, q) {
    $('#error-container').empty();

    const API_KEY = getApiKey(); 
    var BASE_URL = 'https://newsapi.org/v2/top-headlines'
    // TODO: set proper api
    var country_index = country.indexOf('(');
    country_code = country.substring(country_index+1,country_index+3)
    var apiCall = ''
    
    if(q == '') {
        if(country == 'Any') {
            if(category == 'Any') {
                $('#error-container').append('<div class="alert alert-danger" role="alert">Invalid Request: You need to set at least one parameter.</div>');
                error = true
            } else {
                apiCall = `${BASE_URL}?category=${category}&apiKey=${API_KEY}`
            }
        } else {
            if(category == 'Any') {
                apiCall = `${BASE_URL}?country=${country_code}&apiKey=${API_KEY}`
            } else {
                apiCall = `${BASE_URL}?country=${country_code}&category=${category}&apiKey=${API_KEY}`
            }
        }
    } else {
        if(country == 'Any') {
            if(category == 'Any') {
                apiCall = `${BASE_URL}?q=${q}&apiKey=${API_KEY}`;
            } else {
                apiCall = `${BASE_URL}?q=${q}&category=${category}&apiKey=${API_KEY}`
            }
        } else {
            if(category == 'Any') {
                apiCall = `${BASE_URL}?q=${q}&country=${country_code}&apiKey=${API_KEY}`
            } else {
                apiCall = `${BASE_URL}?q=${q}&country=${country_code}&category=${category}&apiKey=${API_KEY}`
            }
        }
    }
    
    fetch(apiCall)
    .then(function(response) {
        error = false
        return response.json();
      }
    ).catch((error) => {
        console.log(error)
        $('#error-container').append('<div class="alert alert-danger" role="alert">An error occurer: Invalid call to API or weak connection.</div>');
        error = true
    }).then(function(data) {
        console.log(data)
        error = false
        var articles = data['articles'];
        renderResults(articles)
        
    }).catch((error) => {
        console.log(error)
        $('#error-container').append('<div class="alert alert-danger" role="alert">An error occured: Invalid call to API or weak connection.</div>')
        error = true;
    });
}

function renderResults(results) {
    $("#search-results-container").empty();
    if(results.length != 0) {
        $("#search-results-container").append(`<div class="col-12"><button type="button" class="btn btn-primary">
            Articles <span class="badge badge-light">${results.length}</span>
        </button>
        <hr class="my-4 bs-seperator"></div>`);
        results.forEach(result => {
            var author = result.author;
            var source = result.source.name;
            var title = result.title;
            var description = result.description;
            var link = result.url;
            var image = result.urlToImage;
            // TODO: append content to #search-results-container
            // TODO: link square to article
            if(result.urlToImage != null) {
                $("#search-results-container").append(`<div class="col-md-4 result-container" id="${link}">
                    <h7 class="article-title">${title}</h7>
                    <h7 class="article-description">${description}</h7>
                    <a href="${link}" target="_blank">
                        <img class="article-image" src="${image}"/>
                    </a>
                    <h7 class="article-author">${source} - ${author}</h7>
                </div>`);
            }
        });
    } else {
        $("#search-results-container").append(`<div id="no-results-container">
            <h2 id="no-results-message">No Results were Found.</h2>
        </div>`);
    }

}