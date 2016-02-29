'use strict';

angular.module('grabilityApp')
    .controller('MainCtrl', function ($scope, services, $timeout, $mdDialog) {
    //1. Initialization
    $scope.noNews = true;
    $scope.activeNews = 'Fresh news';
    $scope.msg = '<span class="md-display-1">Welcome to fresh news!</span><br><span class="md-headline">Press the <i class="material-icons">rss_feed</i> button and enjoy!</span>';
    
    //2. Suport functions
    function toTitleCase(str)
    { //Parse title string to a capitalized string
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    //Controller of Settings dialog
    function DialogController($scope, $mdDialog, services) {
        $scope.actualUrl = services.getNewsUrl();
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.saveChanges = function() {
            if ($scope.url) {
                $mdDialog.hide($scope.url);
            }
        };
    }

    //3. Main functions
    //3.1 - Fetch news
    $scope.getNews = function(){
        $scope.loading = true;
        services.getNews().success(function(response){
            function bind(){
                $scope.loading = false;
                $scope.newsList = response;
                
                //Add parsed title and animation delay
                var animationDelay = 0;
                for(var i=0;$scope.newsList.length>i;i++){
                    var news = $scope.newsList[i];
                    news.title = toTitleCase(news.title);
                    animationDelay += 0.1;
                    news.animationDelay = animationDelay + 's';
                }
                
                //Show or hide welcome message
                if ($scope.newsList.length>0) {
                    $scope.noNews = false;
                } else {
                    $scope.noNews = true;
                }
            }
            $timeout(bind, 500); //Timeout to showcase the loader when retriving local json

        }).error(function(error){
            console.log(error);
            $scope.noNews = true;
            $scope.msg = '<span class="md-display-1">Oooh dear! <i class="material-icons">sentiment_dissatisfied</i></span><br><span class="md-headline">We are having problems fetching the news from the source, please check the source URL or try again later.</span>'; 
            $scope.newsList = undefined;
            $scope.loading = false;
        });
    };
    
    //3.1 - Show content
    $scope.showContent = function(news){
        if (news.id === $scope.showContent_id) {
            $scope.showContent_id = undefined;
            $scope.activeNews = 'Fresh news';
        } else { //Add the title to header and asign id to active element
            $scope.showContent_id = news.id;
            $scope.activeNews = 'Now reading: <b>' + news.title + '</b>';
        }
    };
    
    //3.2 - Open config dialog and retrive url if entered
    $scope.showConfig = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/config.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false
        })
            .then(function(url) {
            if (url) {
                services.setNewsUrl(url);
                $scope.getNews();
            }
        });
    };
});
