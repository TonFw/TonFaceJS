app_id = 229992460513152;

ModuloTonFaceJS.controller('AcoesFBCtrl', function ($scope, $http) {
    
	$scope.SetUp = function(){
            // Configuração da função a ser executada após o SetUp
            func_executada_onSetUp = function(response) {
                if (response.status === 'connected') {
                    console.log('Logged in on FB');
                    $('#acoes_fb').hide();
                    $('#resultado_fb').show();
                }else FB.login();

                usuario_corrente();
            }
            
            setUpFB(app_id);
	}

	$scope.AssinarApp = function() {
            url_redirect = 'tonjs.herokuapp.com/';
            
            assinar_app(app_id, url_redirect);
	}

	$scope.LogOut = function(){
		deslogar_app();
	}
	
});