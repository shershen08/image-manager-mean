app.factory('getMedia', function($q, $http){

    var urlBase = '/';
    var getWordsdataFactory = {};
    

    getWordsdataFactory.getWordList = function () {

        var deferred = $q.defer();
        
        $http.get(urlBase + 'words')
             .success(function(data, status, headers, config) {
                deferred.resolve(data);
        });

        return deferred.promise;
    };

    getWordsdataFactory.saveMemorisedItems = function(memorisedItems){
        var deferred = $q.defer();

        $http.post(urlBase + 'words/writedb', {"data" : memorisedItems})
             .success(function(data, status, headers, config) {
                console.info('saveMemorisedItems', data, status);
                deferred.resolve(data);
            });

        return deferred.promise;
    }

     getWordsdataFactory.clearMemorisedItems = function(){

        $http.post(urlBase + 'words/clear')
             .success(function(data, status, headers, config) {
                console.info('clearMemorisedItems: ', data, status);
            });
    }

    getWordsdataFactory.downloadSelected = function(itemID){

        $http.get(urlBase + 'words/download' , { params : {'id': itemID}})
             .success(function(data, status, headers, config) {
                console.info('downloadSelected: ', data, status);
            });
    }

    getWordsdataFactory.showSavedFiles = function(itemID){

        var deferred = $q.defer();

        $http.get(urlBase + 'words/list')
             .success(function(data, status, headers, config) {
                deferred.resolve(data);
            });

        return deferred.promise;
    }    


    getWordsdataFactory.getCatogorisedFiles = function(itemID){

        var deferred = $q.defer();

        $http.get(urlBase + 'words/readdb', { params : {'file' : 'images'}})
             .success(function(data, status, headers, config) {
                deferred.resolve(data);
            });

        return deferred.promise;
    } 

    getWordsdataFactory.getGalleries = function(){

        var deferred = $q.defer();

        $http.get(urlBase + 'words/readdb', { params : {'file' : 'galleries'}})
             .success(function(data, status, headers, config) {
                deferred.resolve(data);
            });

        return deferred.promise;
    }

    getWordsdataFactory.removeLocalFile = function(urlOfFileToRemove){
        var deferred = $q.defer();

        $http.get(urlBase + 'words/remove', { params : {'file' : urlOfFileToRemove}})
             .success(function(data, status, headers, config) {
                console.info('removeLocalFile: ', data, status);
                deferred.resolve(data);
            });
        return deferred.promise;
    }

    //todo - put to separate user factory
     getWordsdataFactory.authoriseUser = function(userData){

        $http.post(urlBase + 'words/authorise', userData)
             .success(function(data, status, headers, config) {
                console.info('authoriseUser: ', data, status);
            });
    }

    return getWordsdataFactory;

})

app.factory('getImages', function($q, $http){

    var getImagesdataFactory = {};
    


    getImagesdataFactory.getList = function () {

        var deferred = $q.defer();
        
        $http.get('http://api.oboobs.ru/noise/50')
             .success(function(data, status, headers, config) {
                deferred.resolve(data);
        });
        return deferred.promise;
    };



    return getImagesdataFactory;

})