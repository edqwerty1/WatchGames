(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'dataService', dashboard]);

    function dashboard(common, dataService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Hot Towel Angular',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getTopGames()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getMessageCount() {
           
                return vm.messageCount = 9;
 
        }

        function getTopGames() {
            dataService.getTopGames().then(function (data) {
                vm.topGames = data;
                return vm.topGames;
            },
            function (error) {
                vm.error = error;
            });
        }
    }
})();