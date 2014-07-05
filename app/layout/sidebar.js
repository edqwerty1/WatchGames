(function () {
    'use strict';

    var controllerId = 'sidebar';
    angular.module('app').controller(controllerId,
        ['$route', 'config', 'dataService', 'common', sidebar]);

    function sidebar($route, config, dataService, common) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        vm.isCurrent = isCurrent;

        activate();

        function activate() {
            var promises = [getNavRoutes()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated nav routes View'); });
        }
        function getNavRoutes() {
            vm.navRoutes = [];
            dataService.getTopGames().then(function (data) {
                data.top.forEach(function (r) {
                    vm.navRoutes.push({
                        url: '/watch/' + r.game.name,
                        config: {
                            title: r.game.name,
                            templateUrl: 'app/watch/watch.html',
                            settings: {
                                nav: 3,
                                content: '<i class="fa fa-lock"></i>' + r.game.name
                            }
                        }
                    });
                }
                );


                return vm.navRoutes;
            }
            ,
        function (error) {
            vm.error = error;
        });
        }

        function isCurrent(route) {
            //if (!route.config.title || !$route.current || !$route.current.title) {
            //    return '';
            //}
            //var menuName = route.config.title;
            //return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    };
})();
