'use strict';

angular.module('grabilityApp')
    .factory('services', function ($http) {
    // Public API here
    var APIurl = "json/news_mock.json";
    return {
        setNewsUrl: function(newUrl){
            if (newUrl) {APIurl = newUrl;}
        },
        getNewsUrl: function(){
            return APIurl;
        },
        getNews: function () {
            return $http({method: 'GET', url: APIurl});
        }
    };
});
