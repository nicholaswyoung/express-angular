//= require angular
//= require angular.resource

var App = window.App = angular.module('testApp', ['ngResource'])
,   PostCtrl;

App.config

App.factory('Post', ['$resource', function ($resource) {
  return $resource('posts/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}]);

PostCtrl = ['$scope', 'Post', function ($scope, Post) {
  $scope.posts = Post.query();

  $scope.addPost = function () {
    this.post = Post.save($scope.newPost);
    $scope.posts.push(this.post);
    $scope.newPost = {};
  };
}];
