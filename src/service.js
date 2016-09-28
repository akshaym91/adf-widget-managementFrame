'use strict';
/**
 * @ngdoc service
 * @name adf.deviceViewService
 * @description Service to get the devices information
 * @author Akshay Menon <makshay@avaya.com>
 *
 * `deviceViewService` makes an AJAX call to get the devices from the
 * API exposed by Configuration Application(COM).
 * The URL is passed in from the config object as `deviceViewUrl`
 *
 * @return {object} [description]
`{
      status: ‘success’,
      payload: {
          title: ‘Configurable Device Inventory Summary ‘, 
          description: ‘ Displays the device inventory summary with selectable views’,
          chart_type: [‘rowexpand_table’],
          variables: [
               { id: ‘name’, label: ‘Device Name’, type: ‘string’ }, 
               { id: ‘ipAddr’, label: ‘IP Address’, type: ‘string’ }, 
               { id: ‘family’, label: ‘Device Family’, type: ‘string’ },
               { id: ‘model’, label: ‘Model’, type: ‘string’ },
               { id: ‘swVersion’, label: ‘SW Version’, type: ‘string’ }
           ],
          values: [
               {name: 'BLR-M1',ipAddr: '10.133.139.239', family: 'VSP 4000', model: 'mVSP4850GTS', swVersion:'5.0.0.006'}, 
               {name: 'BLR-M2',ipAddr: '10.133.139.221', family: 'VSP 8000', model: 'mVSP8284SXQ', swVersion:'5.1.0.002'}, 
               {name: 'BLR-M3',ipAddr: '10.133.139.207', family: 'VSP 7200', model: 'mVSP7254XTQ', swVersion:'5.1.0.002'}, 
               {name: 'BLR-M4',ipAddr: '10.133.139.222', family: 'VSP 4000', model: 'mVSP4850GTS', swVersion:'5.1.0.002'}, 
               {name: 'BLR-M5',ipAddr: '10.133.139.139', family: 'VSP 4000', model: 'mVSP4850GTS-PWR-PLUS', swVersion:'5.0.0.009'}, 
               {name: 'BLR-M6',ipAddr: '10.133.131.39', family: 'VSP 8000', model: 'mVSP8284SXQ', swVersion:'5.1.0.0'}, 
               {name: 'BLR-M7',ipAddr: '10.133.131.23', family: 'VSP 7200', model: 'mVSP7254XTQ', swVersion:'5.1.0.0'}, 
               {name: 'BLR-M8',ipAddr: '10.133.139.19', family: 'VSP 4000', model: 'mVSP4850GTS-PWR-PLUS', swVersion:'5.0.0.009'}, 
               {name: 'BLR-M9',ipAddr: '10.133.131.55', family: 'VSP 4000', model: 'mVSP4850GTS-PWR-PLUS', swVersion:'5.1.0.002'}, 
               {name: 'BLR-M10',ipAddr: '10.133.139.212', family: 'VSP 4000', model: 'mVSP4850GTS', swVersion:'5.0.0.006'}, 
               {name: 'BLR-M11',ipAddr: '10.133.139.112', family: 'VSP 4000', model: 'mVSP4850GTS', swVersion:'5.0.0.006'}, 
               {name: 'BLR-S1',ipAddr: '10.133.139.116', family: 'ERS 3500', model: 'mERS3526T', swVersion:'5.3.0.004'}, 
               {name: 'BLR-S2',ipAddr: '10.133.139.103', family: 'ERS 3500', model: 'mERS3526T', swVersion:'5.3.2.002'}, 
               {name: 'BLR-S3',ipAddr: '10.133.131.99', family: 'ERS 4900', model: 'mERS4950GTS-PWR-PLUS', swVersion:'7.2.0.003'}, 
               {name: 'BLR-S4',ipAddr: '10.133.139.83', family: 'ERS 4900', model: 'mERS4950GTS', swVersion:'7.2.0.003'}, 
               {name: 'BLR-S5',ipAddr: '10.133.139.133', family: 'ERS 4900', model: 'mERS4950GTS', swVersion:'7.2.0.003'}, 
               {name: 'BLR-S6',ipAddr: '10.133.131.218', family: 'ERS 5500', model: 'mERS5530-24TFD', swVersion:'6.8.3.001'}, 
               {name: 'BLR-S7',ipAddr: '10.133.139.111', family: 'ERS 4800', model: 'mERS4850GTS-PWR-PLUS', swVersion:'5.9.1.004'}, 
               {name: 'BLR-S8',ipAddr: '10.133.133.165', family: 'ERS 5900', model: 'mERS5928GTS', swVersion:'7.1.0.06'}, 
               {name: 'BLR-S9',ipAddr: '10.133.139.138', family: 'ERS 4800', model: 'mERS4850GTS-PWR-PLUS', swVersion:'5.9.1.004'}, 
               {name: 'BLR-S10',ipAddr: '10.133.133.231', family: 'ERS 4800', model: 'mERS4850GTS', swVersion:'5.8.0.024'}, 
               {name: 'BLR-S11',ipAddr: '10.133.139.156', family: 'ERS 5900', model: 'mERS5928GTS', swVersion:'7.1.0.06'}, 
               {name: 'BLR-S12',ipAddr: '10.133.139.175', family: 'ERS 4500', model: 'mERS4548GT', swVersion:'5.7.0.005'}, 
               {name: 'BLR-S13',ipAddr: '10.133.139.176', family: 'ERS 4800', model: 'mERS4850GTS', swVersion:'5.8.0.024'}, 
               {name: 'BLR-S14',ipAddr: '10.133.133.77', family: 'ERS 3500', model: 'mERS3526T-PWR-PLUS', swVersion:'5.3.2.002'}, 
               {name: 'BLR-S15',ipAddr: '10.133.139.68', family: 'ERS 4800', model: 'mERS4850GTS', swVersion:'5.9.1.004'}
           ]
     }
}
`
 */
angular.module('adf.widget.managementFrame')
  .service('managementFrameService', ['$q', '$http', function($q, $http) {
    return {
      getDevices: function() {
        var deferred = $q.defer();
        var url = 'http://10.133.131.59:3000/eonDevice';
        // var url = deviceViewUrl;
        $http.get(url)
          .success(function(data) {
            if (data) {
              deferred.resolve(data);
            }
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  }]);