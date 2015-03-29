app.directive('cardLook', function($compile){

    var mediaURL = 'http://media.oboobs.ru/noise_preview/';
    var errorImg = 'http://google.com/favicon.ico';

    var imagesTemplate = '<h3>{{details.id}}</h3>' + 
                         '<img ng-src="' + mediaURL + '{{details.id}}.jpg" ' + 
                         'class="img-rounded img-responsive app-image" err-src="' + errorImg + '"/>' + 
                         '<span class="label label-info">{{(index+1)}} of {{length}}</span>';

    var textTemplate = '<h1>{{details.nl}}</h1>' + 
                        '<br>{{details.en}}<br><span class="label label-info">{{(index+1)}} of {{length}}</span>';  
    
    var getTemplate = function(voc){
        if(true){
                return imagesTemplate;
            } else {
                return textTemplate;
            }
    };

    return {
        "restrict": "EA",
        "scope" : {
            details: '=',
            index: '=',
            length : '=',
            selectedvoc : '='
        },

        "link": function(scope, element, attrs){

            attrs.$observe('ngSrc', function(value) {
              if (!value && attrs.errSrc) {
                attrs.$set('src', attrs.errSrc);
              }
            });
            

            element.html(getTemplate(scope.selectedvoc)).show();
            $compile(element.contents())(scope);
            element.addClass('zoomIn');

        }
    }
})

app.directive('errSrc', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          
          attrs.$set('src', attrs.errSrc);
          
          $rootScope.$broadcast('swipeapp.imageLoadFailed');

        }
      });
    }
  }
}]);