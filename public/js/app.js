
var app = angular.module("myApp", [  'ui.bootstrap', 'ui.bootstrap.modal',
    'ui.bootstrap.tpls']);

app.controller("myCtrl",  function($scope, $http, $httpParamSerializer) {
    $scope.headers = ["Task", "Priority", "Due Date"];
    $scope.fields=["name", "priority", "dueDate"];
    $scope.sortBy = "";
    $scope.order = -1;

    $scope.load = function() {
      var p = $httpParamSerializer({
           field:$scope.sortBy,
           order:$scope.order
         });
      $http.get("/tasks/pending/?"+p)
      .then(function(response) {
          $scope.pending = response.data;
      });
      $http.get("/tasks/overdue/")
      .then(function(response) {
          $scope.overdue = response.data;
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
    $scope.formatFromNow = function(date) {
      return moment(date).fromNow();
    }
    $scope.sort = function($index) {
      $scope.sortBy = $scope.fields[$index];
      $scope.order = -$scope.order;
      $scope.load();
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
          $scope.load();
          $scope.name = null;
          $scope.priority = null;
        //   $scope.created = true;
        //   setTimeout(function() {
        //     console.info("Closing");
        //      //$(".alert").alert('close');
        //      $scope.created = null;
        //  }, 2000);
        });

      }, 1000);

    }
    $scope.delete = function (task) {
      console.info("task.id: "+task._id);
      $http.get("/task/destroy/"+task._id)
      .then(function () {
        $scope.load();
      });
    }
    $scope.complete = function(task) {

    }
    $scope.load();
});


$(function () {
    $('#datetimepicker1').datetimepicker();
});
