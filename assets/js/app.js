//= require angular
//= require angular.resource
//= require angular.route

var App = window.App = angular.module('testApp', ['ngResource', 'ngRoute'])
,   PostCtrl, PostDetailCtrl;

App.factory('Post', [
  '$resource',
  function ($resource) {
    return $resource('posts/:id', { id: '@id' }, {
      update: { method: 'PUT' }
    });
  }
]);

App.controller('PostCtrl', [
  '$scope',
  'Post',
  function ($scope, Post) {
    $scope.posts = Post.query();

    $scope.addPost = function () {
      this.post = Post.save($scope.newPost);
      $scope.posts.push(this.post);
      $scope.newPost = {};
    };
  }
]);

App.controller('PostDetailCtrl', [
  '$scope',
  '$routeParams',
  'Post',
  function ($scope, $routeParams, Post) {
    $scope.post = Post.get({ id: $routeParams.id });

    $scope.savePost = function () {
      $scope.post.$update();
    }
  }
]);

App.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'PostCtrl',
      templateUrl: 'templates/posts/index'
    })
    .when('/posts/:id', {
      templateUrl: 'templates/posts/show',
      controller: 'PostDetailCtrl'
    })
}]);
