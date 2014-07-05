(function () {
    'use strict';
    var controllerId = 'watch';
    angular.module('app').controller(controllerId, ['common', '$route','$routeParams', watch]);

    function watch(common, $route, $routeParams) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = $routeParams.game;

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
        }
    }
})();