// method to load contents from other hmtl: $('#content').load("../abc.html");
$(document).ready(function(){
    
    reloadPage('dashboard');

    $('#dashboard-sidebar-button').click(function() {
        reloadPage('dashboard');
    });
    $('#portfolio-sidebar-button').click(function() {
        reloadPage('portfolio');
    });
    $('#news-sidebar-button').click(function() {
        reloadPage('news');
    });
    $('#docs-sidebar-button').click(function() {
        reloadPage('docs');
    });
    $('#settings-sidebar-button').click(function() {
        reloadPage('settings');
    });


    $('#min-sidebar-button').click(function() {
        const ANIMATION_DURATION = 300;
        var button = $('#min-sidebar-button');
        var sidebar = $('#admin-sidebar');
        var sidebarTitle = $('#product-name');
        var sidebarDashboard = {li: $('#dashboard-link'), min: '<ion-icon name="desktop" id="dashboard-icon" style="font-size: 50px; margin-left: 25px;"></ion-icon>', exp: '<ion-icon name="desktop" id="dashboard-icon"></ion-icon> Dashboard'}
        var sidebarPortfolio = {li: $('#portfolio-link'), min: '<ion-icon name="pie-chart" id="portfolio-icon" style="font-size: 50px; margin-left: 25px;"></ion-icon>', exp: '<ion-icon name="pie-chart" id="portfolio-icon"></ion-icon>Portfolio'}
        var sidebarNews = {li: $('#news-link'), min: '<ion-icon name="newspaper" id="news-icon" style="font-size: 50px; margin-left: 25px;"></ion-icon>', exp: '<ion-icon name="newspaper" id="news-icon"></ion-icon>News'}
        var sidebarDocs = {li: $('#docs-link'), min: '<ion-icon name="document" id="docs-icon" style="font-size: 50px; margin-left: 25px;"></ion-icon>', exp: '<ion-icon name="document" id="docs-icon"></ion-icon>Docs'}
        var sidebarSetup = {li: $('#settings-link'), min: '<ion-icon name="settings" id="settings-icon" style="font-size: 50px; margin-left: 25px;"></ion-icon>', exp: '<ion-icon name="settings" id="settings-icon"></ion-icon>Settings'}
        var arrow = {li: $('#min-sidebar-button'), min: '<ion-icon name="add-outline" style="font-size: 60px; margin-left: 75px; margin-top: 50px;"></ion-icon>', exp: '<ion-icon name="arrow-back" style="font-size: 50px; margin-left: 75px; margin-top: 50px;"></ion-icon>'}
        var sidebarLinks = [sidebarDashboard, sidebarPortfolio, sidebarNews, sidebarDocs, sidebarSetup, arrow]
        
        if(sidebar.width() == 250) {
            sidebar.animate({
                width: 125,
            },{duration: ANIMATION_DURATION, queue: false});
            
            button.animate({
                marginLeft: '-=' + 60
            }, {duration: ANIMATION_DURATION, queue: false});
            sidebarTitle.text("TB");

            sidebarLinks.forEach(element => {
                element.li.empty();
                element.li.append(element.min);
            });
        } else {
            sidebar.animate({
                width: 250
            }, {duration: ANIMATION_DURATION, queue: false});
            button.animate({
                marginLeft: '+=' + 60
            }, {duration: ANIMATION_DURATION, queue: false});
            sidebarTitle.text("Tradin' Buddy");
            
            sidebarLinks.forEach(element => {
                element.li.empty();
                element.li.append(element.exp);
            });
        }
    });    
});


function reloadPage (pageName) {
    var contentDiv = $('#content');
    switch(pageName) {
        case 'dashboard':
            contentDiv.load('../pages/dashboard.html');
            break;
        case 'portfolio':
            contentDiv.load('../pages/portfolio.html');
            break;
        case 'news':
            contentDiv.load('../pages/news.html');
            break;
        case 'docs':
            contentDiv.load('../pages/docs.html');
            break;
        case 'settings':
            contentDiv.load('../pages/settings.html');
            break;
    }
}