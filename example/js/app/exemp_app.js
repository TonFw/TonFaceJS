app_id = 229992460513152;

ModuloTonFaceJS.controller('AcoesFBCtrl', function ($scope, $http) {
    // Executa as funções básicas do FB e do Framework para 
	$scope.SetUp = function(){
            // Configuração da função a ser executada após o SetUp
            func_executada_onSetUp = function(response) {
                if (response.status === 'connected') {
                    $('#acoes_fb').hide();
                    $('#resultado_fb').show();
                    get_user_admin_pages();
                }else FB.login();

                get_current_user();
            }
            
            setUpFB(app_id);
	}

	$scope.SignUpApp = function() {
            url_redirect = 'tonjs.herokuapp.com/';
            escopo = 'email, publish_stream, manage_pages';
            
            signup_app(app_id, escopo, url_redirect);
	}

	$scope.LogOut = function(){
		signout_app();
	}

    $scope.PubFeed = function(){
        set_feed_msg(mensagem='testando', link='http://google.com.br');
    }
	
});