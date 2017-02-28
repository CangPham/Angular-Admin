(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops')
        .factory('CheckboxService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['CheckboxService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};
        var selected = [];

        service.updateSelection = updateSelection;
        service.selectAll = selectAll;
        service.isSelectedAll = isSelectedAll;
        service.isSelected = isSelected;


        return service;

        function updateSelected(action, id) {
            if (action === 'add' && selected.indexOf(id) === -1) {
                selected.push(id);
            }
            if (action === 'remove' && selected.indexOf(id) !== -1) {
                selected.splice(selected.indexOf(id), 1);
            }
            return selected;
        }

        function updateSelection($event, id) {
            var checkbox = $event.target;

            var action = (checkbox.checked ? 'add' : 'remove');
            return updateSelected(action, id);
        }

        function selectAll($event, entities, key) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            for ( var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                updateSelected(action, entity[key]);
            }
            return selected;
        }

        function getSelectedClass(entity, key) {
            return isSelected(entity[key]) ? 'selected' : '';
        }

        function isSelected(id) {
            return selected.indexOf(id) >= 0;
        }

        function isSelectedAll(entities) {

            return selected.length === entities.length;
        }

        function getSelected() {

            return selected;
        }

    }
})();