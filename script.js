'use strict';

var app = angular.module('myApp', []);

app.controller("myController", function($scope, contextHelpPopup) {
  $scope.message = "Context Help Example";
  $scope.helpid = 'helpid';

  $scope.ShortCutsProcessor = function() {
    contextHelpPopup.popUp();
  }
});

app.directive('contextHelp', function() {
  var baseUrl = 'https://en.m.wikipedia.org/wiki/';
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'context-help.html',
    scope: {
      title: "@",
      helpid: "@",
      limit: "@"
    },
    controller: function($scope) {
      $scope.url = baseUrl + $scope.helpid;
    }
  }
});

app.directive('shortcuts', function() {
  return {
    scope: {
      callback: "&"
    },
    link: function($scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        //console.log(event.which);
        if (event.which === 112) {
          if ($scope.callback) $scope.callback();
          event.preventDefault ? event.preventDefault() : e.returnValue = false;
          //e.cancelBubble is supported by IE - this will kill the bubbling process.
          event.cancelBubble = true;
          event.returnValue = false;
          //e.stopPropagation works only in Firefox.
          if (event.stopPropagation) {
            event.stopPropagation();
          }
          return false;
        }
      });
    }
  }
});

app.factory('contextHelpPopup', function() {
  return {
    popUp: function() {
      alert('Help from callback');
    }
  }
});
