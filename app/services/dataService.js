(function () {
    'use strict';

    var serviceId = 'dataService';
    angular.module('app').factory(serviceId, ['$http', 'common', dataService]);

    function dataService($http, common) {
        var $q = common.$q;

        var service = {
            getTopGames: getTopGames,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getTopGames() {
            var deferred = new $q.defer();
            $http.jsonp('https://api.twitch.tv/kraken/games/top?callback=JSON_CALLBACK')
                .success(function (resp) {
                deferred.resolve(resp);
            }).error(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
})();