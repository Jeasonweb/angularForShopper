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
      //����һ��������ʵ�ָ���ҳ������ͣ���ȡ��Ʒ����
      $scope.getProductData = function(num,type){
        $http.get('data/product_select.php?pageNum=' + num + '&type=' + type)
          .success(function(result){
            console.log(result);
            $scope.listData = result;
            //����һ�����飬���ڴ洢ҳ��
            $scope.pageArray = [];
            for(var i=0;i<result.pageCount;i++){
              $scope.pageArray[i] = i+1;
            }
          });
      };
    }])
  .controller('mainCtr',['$scope','$http',
    function($scope,$http){
      //ʵ���ֲ��Ĺ���
      $scope.imgData = ['images/banner_01.jpg',
        'images/banner_02.jpg','images/banner_03.jpg','images/banner_04.jpg'];
      //��ʽ�Ĵ����ֲ�
      $('.carousel').carousel();

      //��ȡ���Ŷ�̬���ݣ����ڽ������ʾ
      $http.get('data/news_select.php').
        success(function(result){
          $scope.newsData = result.data;
        });
    }])
  .controller('listCtr',function($scope,$routeParams){
      //��ʼ��ʱ���õ�ҳ�洫���Ĳ�������ȡ���ݰ���ʾ
      $scope.$parent.getProductData(1,$routeParams.pType);
  })
  .controller('detailCtr',['$scope','$http','$routeParams',
    function($scope,$http,$routeParams){
      //��ʼ������
      $http.get('data/product_detail.php?pid='+$routeParams.pid)
        .success(function(result){
          console.log(result);
          $scope.product = result;
        });

      //���������ڼ��빺�ﳵ
      $sceop.addCart  = function(){
          //�ж� uid�����û�У��ӵ�login

          //����У���uid����php���������ݵ�php
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
              //��¼�ɹ��������û���Ϣ������ת
              $rootScope.userInfo = {'uid':result.uid,
                  'username':result.uname};
              history.go(-1);
            }
            else{
              //����ʧ����Ϣ����ʾ��ҳ��
              $scope.errorInfo = '��¼ʧ�ܣ���ע���������';
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

