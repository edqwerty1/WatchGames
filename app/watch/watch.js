(function () {
    'use strict';
    var controllerId = 'watch';
    angular.module('app').controller(controllerId, ['common', '$route','$routeParams','dataService', watch]);

    function watch(common, $route, $routeParams, dataService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = $routeParams.game;

        activate();

        function activate() {
            var promises = [getChannels()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Admin View'); });
        }

        function getChannels() {

            dataService.getChannels(vm.title).then(function (data) {
                vm.channels = data.streams;
                return vm.channels;
            },
            function (error) {
                vm.error = error;
            });
        }
    }
})();