var app = angular.module("myApp", [  'ui.bootstrap', 'ui.bootstrap.modal',
    'ui.bootstrap.tpls']);

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

app.controller("myCtrl",  function($scope, $http, $httpParamSerializer) {
    $scope.headers = ["Priority", "Task", "Due Date"];
    $scope.fields=["priority", "name",  "dueDate"];
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
          if ($scope.pending.length) {
            var array =   $scope.pending.map(function (task){
                return new Date(task.dueDate);
              });
            var expiration = array.min();
            setTimeout($scope.load, expiration-new Date());
          }
      });
      $http.get("/tasks/overdue/")
      .then(function(response) {
          $scope.overdue = response.data;
      });
      $http.get("/tasks/completed/")
      .then(function(response) {
          $scope.completed = response.data;
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
        $http.post("/task/", task).then(function () {
          $scope.load();
          $scope.name = null;
          $scope.priority = null;
        });

      }, 100);
    }
    $scope.delete = function (task) {
      $http.get("/task/destroy/"+task._id)
      .then($scope.load);
    }
    $scope.priorityColor = function (priority) {
      var classes = {"Inmediate":"danger", "Low":"info", "High priority":"warning", "Default, unspecified":"info"};
      return classes[priority];
    }
    $scope.complete = function(task) {
      $http.post("/task/update/"+task._id, task)
      .then($scope.load);
    }
    $scope.undoComplete = function(task) {
      $http.post("/task/undo/"+task._id, task)
      .then($scope.load);
    }
    $scope.load();
});


$(function () {
    $('#datetimepicker1').datetimepicker();
});
