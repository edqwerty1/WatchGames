(function () {
    'use strict';
    var controllerId = 'stream';
    angular.module('app').controller(controllerId, ['common',  '$sce','$route','$routeParams','dataService', stream]);

    function stream(common, $sce, $route, $routeParams, dataService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = $routeParams.channel;

        activate();

        function activate() {
            var promises = [getStream()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Admin View'); });
        }

        function getStream() {

            dataService.getStream(vm.title).then(function (data) {
                vm.streamUrl = $sce.trustAsResourceUrl('http://www.twitch.tv/' + data.stream.channel.name + '/hls');
                return vm.stream;
            },
            function (error) {
                vm.error = error;
            });
            return vm.stream;
        }
    }
})();