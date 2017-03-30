/**
 * Created by bjwsl-001 on 2017/1/4.
 */
angular.module('refreshAPP',['ng','ngRoute','ngAnimate'])
  .config(function($routeProvider){
    $routeProvider
      .when('/main',{
        templateUrl:'tpl/main.html',
        controller:'mainCtr'
      })
      .when('/list',{
        templateUrl:'tpl/list.html',
        controller:'listCtr'
      })
      .when('/list/:pType',{
        templateUrl:'tpl/list.html',
        controller:'listCtr'
      })
      .when('/detail/:pid',{
        templateUrl:'tpl/detail.html',
        controller:'detailCtr'
      })
      .when('/login',{
        templateUrl:'tpl/login.html',
        controller:'loginCtr'
      })
      .otherwise('main');
  })
  .controller('parentCtr',['$scope','$http',
    function($scope,$http){
      //定义一个方法，实现根据页码和类型，获取产品数据
      $scope.getProductData = function(num,type){
        $http.get('data/product_select.php?pageNum=' + num + '&type=' + type)
          .success(function(result){
            console.log(result);
            $scope.listData = result;
            //定义一个数组，用于存储页码
            $scope.pageArray = [];
            for(var i=0;i<result.pageCount;i++){
              $scope.pageArray[i] = i+1;
            }
          });
      };
    }])
  .controller('mainCtr',['$scope','$http',
    function($scope,$http){
      //实现轮播的功能
      $scope.imgData = ['images/banner_01.jpg',
        'images/banner_02.jpg','images/banner_03.jpg','images/banner_04.jpg'];
      //显式的触发轮播
      $('.carousel').carousel();

      //提取新闻动态数据，用于界面的显示
      $http.get('data/news_select.php').
        success(function(result){
          $scope.newsData = result.data;
        });
    }])
  .controller('listCtr',function($scope,$routeParams){
      //初始化时，得到页面传来的参数，获取数据绑定显示
      $scope.$parent.getProductData(1,$routeParams.pType);
  })
  .controller('detailCtr',['$scope','$http','$routeParams',
    function($scope,$http,$routeParams){
      //初始，加载
      $http.get('data/product_detail.php?pid='+$routeParams.pid)
        .success(function(result){
          console.log(result);
          $scope.product = result;
        });

      //方法：用于加入购物车
      $sceop.addCart  = function(){
          //判断 uid，如果没有，扔到login

          //如果有，用uid，调php，发送数据到php
      };
    }
  ])
  .controller('loginCtr',['$scope','$http','$rootScope',
    function($scope,$http,$rootScope){
      $scope.login = function(){
        console.log($scope.username);
        console.log($scope.pwd);
        $http.get('data/user_login.php?aa=&b=')
          .success(function(result){
            if(result.code == 1){
              //登录成功：保存用户信息，再跳转
              $rootScope.userInfo = {'uid':result.uid,
                  'username':result.uname};
              history.go(-1);
            }
            else{
              //记载失败信息，显示在页面
              $scope.errorInfo = '登录失败，请注册或者重试';
            }
          });
      }
  }])
  .directive('stringHtml',function(){
    return function(scope,el,attr){
      if(attr.stringHtml){
        scope.$watch(attr.stringHtml,function(html){
          el.html(html||'');
        });
      }
    }
  });

