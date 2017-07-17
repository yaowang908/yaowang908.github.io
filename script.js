var appFree = angular.module('free',[]);
appFree.controller('list',function($scope){
    $scope.menu=[
        {url :"#resources",name:"Resources"},
        {url :"http://learner908.blogspot.com/",name:"Blog"},
        {url :"http://wp-422321065.rhcloud.com/",name:"Others"},
    ];
    $scope.sitesILove=[
        {url:"http://placehold.it",name:"Create Imageholder"},
        {url:"http://codepen.io",name:"Front-end Playground"},
        {url:"http://caniuse.com/#home",name:"Check Cross Browser"},
        {url:"http://thenews.im/",name:"The News!"},
        {url:"https://mubu.com/",name:"Online White Board"},
        {url:"https://www.merriam-webster.com",name:"Online Dictionary"},
        {url:"http://easings.net",name:"Easing cheat sheet"},
        {url:"http://www.etymonline.com",name:"Etymology Online"},
        {url:"https://tinyjpg.com/",name:"Compress Image"},
        {url:"https://www.autodraw.com/",name:"FastDraw w/ AI"},
        {url:"https://pixlr.com/editor/",name:"Online PS"},
        {url:"http://www.polaxiong.com/editor",name:"OL Photo Filter"}
    ];
    // click function
    $scope.sitesILoveIsShow = true;
    $scope.sitesILoveShow = function(){
        $scope.sitesILoveIsShow=!$scope.sitesILoveIsShow;
    };

    $scope.freeImageSites=[
        {url :"http://pixabay.com",name:"Pixabay"},
        {url :"http://www.sitebuilderreport.com/stock-up",name:"Stock up"},
        {url :"https://www.pixelsquid.com/",name:"Pixel Squid"},
        {url :"http://www.iconfont.cn/",name:"Icon Font by Alibaba"},
        {url :"https://unsplash.com/",name:"Unsplash"},
        {url :"http://www.gratisography.com/",name:"Gratisography"},
        {url :"http://www.lifeofpix.com/",name:"Life of pix"},
        {url :"http://publicdomainarchive.com/",name:"Public domain archive"},
        {url :"http://jaymantri.com/",name:"Jaymantri"},
        {url :"http://littlevisuals.co",name:"Little visuals"},
        {url :"http://nos.twnsnd.co/",name:"New old stock"},
        {url :"https://foodiesfeed.com/",name:"Foodies feed"},
        {url :"http://raumrot.com/photo-set-landing/",name:"Raumrot"},
        {url :"http://kaboompics.com/",name:"Kaboompics"},
        {url :"http://www.splitshire.com/",name:"Split shire"},
        {url :"http://magdeleine.co/browse/",name:"Magdeleine"},
        {url :"http://picography.co/",name:"Picography"},
    ];
    // click function
    $scope.freeImageIsShow = true;
    $scope.freeImageShow = function(){
        $scope.freeImageIsShow=!$scope.freeImageIsShow;
    };

    $scope.freeFontSites=[
        {url:"https://www.fontsquirrel.com/",name:"Free font"},
    ];
    // click function
    $scope.freeFontIsShow = false;
    $scope.freeFontShow = function(){
        $scope.freeFontIsShow=!$scope.freeFontIsShow;
    };

    $scope.freeSearchSites=[
        {url:"https://search.creativecommons.org/",name:"CC Search"},
    ];
    // click function
    $scope.freeStuffSearchEngineIsShow = false;
    $scope.freeStuffSearchEngineShow = function(){
        $scope.freeStuffSearchEngineIsShow=!$scope.freeStuffSearchEngineIsShow;
    };

    
});
// appFree.controller('menuburger',function($scope){
//     $scope.menubClick = function($scope){
//             console.log('menu b clicked !');
//             $scope.menubState = 'hide';
//             $scope.menucState = 'show';
//     };
//     $scope.menucClick = function($scope){
//         if($scope.menucState === 'show'){
//             $scope.menucState = 'hide';
//             $scope.menubState = 'show';
//         }
//     };
//     $scope.alert = function(string){
//         alert(string);
//     }
// });
appFree.directive('menuburger',menuburgerclick);
function menuburgerclick(){
    return{
        restrict:'AE',
        link:function($scope,element,attrs){
            $scope.menubClick = function(){
                
            }
        }
    }
}
