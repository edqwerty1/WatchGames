(function () {
    'use strict';
    var controllerId = 'channels';
    angular.module('app').controller(controllerId, ['common', '$route','$routeParams','dataService', channels]);

    function channels(common, $route, $routeParams, dataService) {
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
            vm.channels = [];
            dataService.getChannels(vm.title).then(function (data) {
                data.streams.forEach(function (r) {
                    vm.channels.push({
                        url: '/stream/' + r.channel.name,
                        config: {
                            title: r.channel.name,
                            templateUrl: 'app/watch/watch.html',
                            settings: {
                                nav: 3,
                                content: '<i class="fa fa-lock"></i>' + r.channel.name
                            }
                        }
                    });
                }
                );
                return vm.channels;
            }
            ,
        function (error) {
            vm.error = error;
        });
        }

    }
})();