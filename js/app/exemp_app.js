ModuloTonFaceJS.controller('AcoesFBCtrl', function ($scope, $http) {

	// Função que usa a assinatura do Framework que está sendo criado
	$scope.AssinarApp = function(){
		assinar_app();
	}

	$scope.SetUpFB = function(){
		FB.init({
	    	appId: '229992460513152',
	    }); 

	    FB.getLoginStatus(updateStatusCallback);
	}
});