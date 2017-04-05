var appFree = angular.module('free',[]);
appFree.controller('menu',function($scope){
    $scope.menu=[
        {url :"#resources",name:"Resources"},
        {url :"http://learner908.blogspot.com/",name:"Blog"},
        {url :"http://wp-422321065.rhcloud.com/",name:"Others"},
    ];
});
appFree.controller('freeImageCtrl',function($scope){
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
});
appFree.controller('freeFontCtrl',function($scope){
    $scope.freeFontSites=[
        {url:"https://www.fontsquirrel.com/",name:"Free font"},
    ];
});
appFree.controller('freeSearchCtrl',function($scope){
    $scope.freeSearchSites=[
        {url:"https://search.creativecommons.org/",name:"CC Search"},
    ];
});
appFree.controller('sitesILove',function($scope){
    $scope.sitesILove=[
        {url:"http://placehold.it",name:"Create Imageholder"},
        {url:"http://codepen.io",name:"Front-end Playground"},
        {url:"http://caniuse.com/#home",name:"Check Cross Browser Capability"},
        {url:"http://thenews.im/",name:"The News!"},
        {url:"https://mubu.com/",name:"Online White Board"}
    ];
});

