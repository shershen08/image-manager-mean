var app = angular.module('angularPlugins', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ngTouch']);


app.run(function($rootScope) {

    $rootScope.selectedVoc = 'boobs';
    $rootScope.authorised = false;


    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };



});


jQuery(document).ready(function($) {
    


    $('#card').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass('zoomIn');
    });




});


    var updateModalUI = function() {
        jQuery('#imagesModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget).data('url'); 
          $(this).find('.modal-body img').attr('src', button);
        })
    }