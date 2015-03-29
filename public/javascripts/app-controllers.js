/*

 + adding items to Swipe scope\
 + indication OR animation on swipe 
 + in-place editing: form and API
 + removing file and record
 + writing JSON file
 + if image is not loaded


TODO

 - add file uploading

 - get more file details - size/color etc
 
 - search by title  
 
 - one item state - template and ctrl
 - adding new tags!
 - multiple tags!!
 - settings
 - r.js : bower_components->grunt->production files
 

*/


app.controller('swipeCtrl', ['$scope', '$rootScope', '$timeout', 'getMedia', 'getImages',
                function($scope, $rootScope, $timeout, getMedia, getImages){
        
        $scope.index = 0;
        $scope.savedItems = [];
                
        $rootScope.memorisedItems = [];

        getMedia.getWordList().then(function(data){
            $scope.words = data;
        });
        
        getImages.getList().then(function(data){
            $scope.selectedItems = data;
        });

       $scope.next = function(value){
                if(value>0){
                    $rootScope.memorisedItems.push($scope.selectedItems[$scope.index]);
                    getMedia.downloadSelected($scope.selectedItems[$scope.index].id);
                    $('#card').addClass('item-good');
                } else {
                  $('#card').addClass('item-bad');  
                }
                

                if($scope.index != 0 && $scope.index % 5 == 0){
                    //getMedia.saveMemorisedItems($rootScope.memorisedItems);
                    $scope.checkAmmount();
                }


               $timeout(function(){
                  $('#card').removeClass('item-bad item-good'); 
                  $scope.index++;
                  $('#card').addClass('zoomIn');
               }, 200)

                
        }

        $scope.checkAmmount = function(){

            if($scope.selectedItems.length/$scope.index < 3){
               getImages.getList().then(function(data){
                  $scope.selectedItems = _.union($scope.selectedItems, data);
                });
            }
        }

        $rootScope.$on('swipeapp.imageLoadFailed', function(){
            $scope.next(-1);
        });

}]) 







app.controller('selectedCtrl', ['$scope', '$rootScope', '$q', '$stateParams', 'getMedia',
                function($scope, $rootScope, $q, $stateParams, getMedia){
        
     $scope.memorisedItems = $rootScope.memorisedItems;

     var deferred = $q.defer();

     $scope.clearSelection = function(){

             $rootScope.memorisedItems = [];
            getMedia.clearMemorisedItems();
     }

      var _dbFileList = getMedia.getCatogorisedFiles();
      var _galleryList = getMedia.getGalleries();
      var _localFileList = getMedia.showSavedFiles();

    $q.all([_dbFileList.then(function(data){
        
        $scope.localItems = data;

    }), _galleryList.then(function(data){
        
        $scope.galleries = data;

    }), _localFileList.then(function(data){

        $scope.tmpAdditionalData = data;

    })], function(files,galleries){

      //when everything is finally loaded
      

      if(!$scope.localItems || data.length > $scope.localItems){
        //adding if there are new photos
        $scope.localItems = _.unique(_.union($scope.localItems, $scope.tmpAdditionalData), 'name');
      }

      
       updateModalUI();

    });

    $scope.changeToEdit = function(name){
      $scope.editID = name;

    }

    $scope.openPopUp =  function(furl){
        $scope.popUpedImage = furl;
    }

    $scope.updateItemTags  = function(itemToUpdate, tagID){

      itemToUpdate.collection = tagID;
      getMedia.saveMemorisedItems(_.unique($scope.localItems, 'name'));
    }

    $scope.saveItemEdits = function(imageObject){

      getMedia.saveMemorisedItems(_.unique($scope.localItems, 'name'));
      $scope.changeToEdit(undefined);
    }

     $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){ 
             $scope.filterShow = toParams.galleryId;
    })
    
     $scope.getImageURL = function(fileName){
        return './images/gallery/' + fileName;
     }

    $scope.prettifyDate = function(dateString){
        return dateString.split('T')[0].replace(/-/g,'/');
     }
    

     $scope.removeFile = function(fileURL){
        getMedia.removeLocalFile(fileURL).then(function(){

           $scope.changeToEdit(undefined);

        })
     }

}])


app.controller('loginCtrl', ['$scope', '$rootScope', '$state', 'getMedia',
                function($scope, $rootScope, $state, getMedia){

    if($rootScope.authorised == true){
        $state.go('settings');
    }   
    
    $scope.pass = '';
    $scope.user = '';


    $scope.sendAuthorise = function(){
        
        if($scope.pass != '' && $scope.user != ''){

            $rootScope.authorised = true;

            $state.go('settings');

        }

    }             

}]) 

app.controller('itemCtrl', ['$scope', '$rootScope', '$state',
                function($scope, $rootScope, $state){
    

}])

app.controller('searchCtrl', ['$scope', '$rootScope', '$state',
                function($scope, $rootScope, $state){
    

}])


app.controller('settingsCtrl', ['$scope', '$rootScope', '$state', 'getMedia',
                function($scope, $rootScope, $state, getMedia){
   
        $scope.logoutAuthorise = function(){
            $rootScope.authorised = false;
            $state.go('login');
        }


        $scope.countFS = 
        $scope.countDB = 

        $scope.parseNewImages =  function(){


        }
}]) 
