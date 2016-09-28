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
        resolve: {
          /* @ngInject */
          devices: function(managementFrameService) {
            return managementFrameService.getDevices();
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/managementFrame/src/edit.html'
        },
        config: {
          height: '700px'
        }
      });
  })
  .controller('managementFrameController', function($sce, $scope, config, UniqueIdentifier, devices) {
    // $scope.$on('sentToEEM', function(event, args) {
    //   config.url = $sce.trustAsResourceUrl(args[0].url);
    //   //$scope.config.height = '720px';
    //   // $scope.$emit('widgetConfigChanged');
    // });

    if (UniqueIdentifier.getUniqueIdentifier()) {
      var id = UniqueIdentifier.getUniqueIdentifier();
      $scope.dataSource = devices.filter(function(device){
          return device._id == id;
      });
      // config.url = $scope.dataSource[0].managementUrl;
      config.url = $sce.trustAsResourceUrl($scope.dataSource[0].managementUrl);
    }

    // if (config.url) {
    //   this.url = $sce.trustAsResourceUrl(config.url);
    // }
  });