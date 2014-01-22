ModuloTonFaceJS.controller('AcoesFBCtrl', function ($scope, $http) {

	$scope.SetUp = function(){
		setUpFB();
	}

	$scope.AssinarApp = function(){
		assinar_app();
	}
	
});