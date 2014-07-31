var cheeseControllers = angular.module('tinglishControllers',[]);

cheeseControllers.controller('TopCtrl',function($scope,$http,$rootScope, $routeParams,$location){
  $rootScope.headerShow = true;

  alert("カードをタップで日本語を表示。正解なら右、不正解なら左へスワイプ。");

  $scope.words = [];
  $http.get('js/words.json').success(function(json) {
    $scope.words = json;
    console.log(json);
  });

  $scope.tapped = function(wordset){
    $scope.japanese = wordset[0]+","+wordset[1];
  }

  var ok = 0;
  var ng = 0;

  var score = function(){
    console.log("-");
    console.log(ok);
    console.log(ng);
    console.log(ok/(ok+ng)*100);
    $scope.score = Math.floor(ok/(ok+ng)*100)
    $scope.$apply();
  }
  // score()

  $rootScope.carouselNext = function(e) {
    index = e[0].id
    $scope.japanese = $scope.words[index][0]+","+$scope.words[index][1];
    $scope.$apply();
    ok += 1;
    e.remove();
    score();
  }

  $rootScope.carouselPrev = function(e) {
    index = e[0].id
    $scope.japanese = $scope.words[index][0]+","+$scope.words[index][1];
    $scope.$apply();
    ng += 1;
    e.remove();
    score();
  }

});