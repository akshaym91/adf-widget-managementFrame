'use strict';

angular.module('adf.widget.managementFrame', ['adf.provider'])
  .config(function(dashboardProvider) {
    dashboardProvider
      .widget('managementFrame', {
        title: 'Element Manager',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/managementFrame/src/view.html',
        controller: 'managementFrameController',
        controllerAs: 'managementFrame',
        edit: {
          templateUrl: '{widgetsPath}/managementFrame/src/edit.html'
        },
        config: {
          height: '700px'
        }
      });
  })
  .controller('managementFrameController', function($sce, $scope, config) {
    $scope.$on('sentToEEM', function(event, args) {
      config.url = $sce.trustAsResourceUrl(args[0].url);
      //$scope.config.height = '720px';
      // $scope.$emit('widgetConfigChanged');
    });

    if (config.url) {
      this.url = $sce.trustAsResourceUrl(config.url);
    }
  });