app_id = 229992460513152;

ModuloTonFaceJS.controller('AcoesFBCtrl', function ($scope, $http) {
    
	$scope.SetUp = function(){
            // Configuração da função a ser executada após o SetUp
            func_executada_onSetUp = function(response) {
                if (response.status === 'connected') {
                    $('#acoes_fb').hide();
                    $('#resultado_fb').show();
                    get_paginas();
                }else FB.login();

                get_usuario_corrente();
            }
            
            setUpFB(app_id);
	}

	$scope.AssinarApp = function() {
            url_redirect = 'tonjs.herokuapp.com/';
            escopo = 'email, publish_stream, manage_pages';
            
            assinar_app(app_id, escopo, url_redirect);
	}

	$scope.LogOut = function(){
		deslogar_app();
	}
	
});