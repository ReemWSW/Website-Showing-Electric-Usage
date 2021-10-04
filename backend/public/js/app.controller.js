var app = angular.module("myApp", []);

const url = window.location.href;

app.controller(
  "ctrlGetData",
  function (
    $scope,
    $http
  ) {

    $scope.getData1 = function () {
      $http.get(`${url}api`).then(function (response) {
          console.log(response);
        $scope.data = response.data.data.result;
      });
    };

    $scope.getData1();
  }
);
