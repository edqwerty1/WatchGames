(function () {
    'use strict';

    var serviceId = 'dataService';
    angular.module('app').factory(serviceId, ['$http', 'common', dataService]);

    function dataService($http, common) {
        var $q = common.$q;

        var service = {
            getTopGames: getTopGames,
            getChannels: getChannels,
            getStream: getStream
        };

        return service;

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

        function getChannels(game) {
            var deferred = new $q.defer();
            $http.jsonp('https://api.twitch.tv/kraken/search/streams?q=' + encodeURI(game) + '&callback=JSON_CALLBACK')
                .success(function (resp) {
                    deferred.resolve(resp);
                }).error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getStream(channel) {
            var deferred = new $q.defer();
            $http.jsonp('https://api.twitch.tv/kraken/streams/' + encodeURI(channel) + '?callback=JSON_CALLBACK')
                .success(function (resp) {
                    deferred.resolve(resp);
                }).error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
})();