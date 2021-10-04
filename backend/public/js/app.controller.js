(function (angular) {
  'use strict';
  angular.module('myApp', ['chart.js'])
      .controller('myController', [function () {
          var ctrl = this;
          ctrl.socialChart = {
              options: {
                  scales: {
                      xAxes: [{
                          stacked: true,
                      }],
                      yAxes: [{
                          stacked: true
                      }]
                  }
              },
              type: 'StackedBar',
              labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              series: ['FACEBOOK', 'GOOGLE', 'TWITTER', 'INSTAGRAM'],
              colors: ['#ED402A', '#F0AB05', '#A0B421', '#00A39F'],
              data: [
                  [65, 59, 90, 81, 56, 55, 40],
                  [28, 48, 40, 19, 96, 27, 100]
              ]
          }
      }]);

})(window.angular);