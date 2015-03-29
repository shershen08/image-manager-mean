app.config(['$stateProvider', function($stateProvider) {
    // List items
    $stateProvider
    .state('home', {
       
                url: '/',
                controller: 'swipeCtrl',
                templateUrl: 'templates/swipeCtrlView.html'
        
    })

    // List only selected items
    .state('selected', {
        
                    url: '/selected',
                    controller: 'selectedCtrl',
                    templateUrl: 'templates/selectedView.html'

    })// List only selected items
    .state('selected.list', {
        
                    url: '/list/:galleryId',
                    controller: 'selectedCtrl',
                    templateUrl: 'templates/selectedView.html'

    })// List only selected items
    .state('selected.item', {
        
                    url: '/item/:itemId',
                    controller: 'itemCtrl',
                    templateUrl: 'templates/selectedItemView.html'

    })
        // List settings
    .state('searchresults', {
        
                    url: '/search',
                    controller: 'searchCtrl',
                    templateUrl: 'templates/searchView.html'
})
    // List settings
    .state('settings', {
        
                    url: '/settings',
                    controller: 'settingsCtrl',
                    templateUrl: 'templates/settingsView.html'

    })// List settings
    .state('login', {
        
                    url: '/login',
                    controller: 'loginCtrl',
                    templateUrl: 'templates/loginView.html'

    })
}]);

app.config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

