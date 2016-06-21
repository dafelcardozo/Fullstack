
var app = angular.module("myApp", []);

app.controller("myCtrl",  function($scope, $http, $httpParamSerializer) {
    $scope.headers = ["Name", "Priority", "Due Date"];
    $scope.fields=["name", "priority", "dueDate"];
    $scope.sortBy = "";
    $scope.order = -1;

    $scope.loadPending = function() {
      var p = $httpParamSerializer({
           field:$scope.sortBy,
           order:$scope.order
         });
      $http.get("/tasks/pending/?"+p)
      .then(function(response) {
          $scope.overdue = response.data;
          $scope.pending = response.data;
      });
    }

    $scope.loadOverdue = function() {
      var p = $httpParamSerializer({
           field:$scope.sortBy,
           order:$scope.order
         });
      $http.get("/task/?"+p)
      .then(function(response) {
          $scope.overdue = response.data;
          $scope.pending = response.data;
      });
    }

    $scope.formatDate = function (date){
      return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
    $scope.sort = function($index) {
      $scope.sortBy = $scope.fields[$index];
      $scope.order = -$scope.order;
      $scope.loadPending();
    }
    $scope.createTask = function() {
      setTimeout(function () {
        var dueDate =$("#datetimepicker1").data("DateTimePicker").date().toDate() ;
        var task = {
          name:$scope.name,
          priority:$scope.priority,
          dueDate:dueDate
        };
        console.info("task.dueDate: "+task.dueDate);
        $http.post("/task/", task).then(function () {
          $scope.loadPending();
        //   $scope.created = true;
        //   setTimeout(function() {
        //     console.info("Closing");
        //      //$(".alert").alert('close');
        //      $scope.created = null;
        //  }, 2000);
        });

      }, 1000);

    }
    $scope.loadPending();
});
