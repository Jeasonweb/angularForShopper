/**
 * Created by bjwsl-001 on 2017/1/5.
 */
angular.module('refreshApp',['ionic'])
  .config(function($stateProvider){
      $stateProvider
        .state('main',{
          url:'/main',
          templateUrl:'tpl/main.html',
          controller:'mainCtr'
        })
  })
  .controller('mainCtr',function($scope,$http){
      //定义数据，存储轮播的图片数据
    $scope.imgArray = ['images/banner_01.jpg',
      'images/banner_02.jpg','images/banner_03.jpg',
      'images/banner_04.jpg'];

    $scope.pageNumber = 1;
    $scope.hasMore = true;
    //页面初始化，显示前5条数据，绑定显示
    $http.get('data/news_select.php?pageNum=1')
      .success(function(result){
        $scope.newsData = result.data;
        $scope.pageNumber++;
    });

    //可以显示更多
    $scope.loadMore =function(){
      $http.get('data/news_select.php?pageNum=' + $scope.pageNumber)
        .success(function(result){
          console.log(result);
          console.log($scope.pageNumber);
          if($scope.pageNumber == result.pageCount)
            $scope.hasMore = false;


          $scope.newsData = $scope.newsData.concat(result.data);
          $scope.pageNumber++;
        });
    };
  })