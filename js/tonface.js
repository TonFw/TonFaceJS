/**
 * Esta variável deve ser preenchida com a função a ser executada depois que o setUp do FB seja concluído
 * Obs: if (response.status === 'connected') significa que a permissão foi dada pelo usuário corrente
 * @type function com @param response
 */
var func_executada_onSetUp;

/**
 * Função que faz a inicialização do FB JS SDK
 * Obs: Lembre de configurar a variável func_executada_onLogin com a função a ser executada no SetUp
 * @param {int} app_id => ID identificador do App em developers.facebook.com
 * @returns {null}
 */
function setUpFB(app_id) {
	window.fbAsyncInit = function() {
	    FB.init({
	        appId      : app_id,
	        status     : true,
	        xfbml      : true
	    });

            FB.Event.subscribe('auth.authResponseChange', func_executada_onSetUp);
	};

	(function(d){
	    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	    js = d.createElement('script'); js.id = id; js.async = true;
	    js.src = "//connect.facebook.net/es_LA/all.js";
	    d.getElementsByTagName('head')[0].appendChild(js);
	}(document));
}

/**
 * Função que redireciona o usuário à tela específica (mobile ou desktop) de Login do FB
 * @param {int} app_id => ID do App que está lá no developers.facebook.com
 * @param {string} url_redirect => URL da aplicação, é aonde o facebook vai redirecionar depois da operação
 * @returns {null}
 */
function assinar_app(app_id, url_redirect){
	url_base_fb_login = 'http://www.facebook.com/dialog/oauth?client_id=';
        param_redirect = '&redirect_uri=http://';
        param_touch = '';

        // Os parametros foram o tamanho da tela do iPad
        if( screen.height <= 770 && screen.width <= 1024 ) eh_mobile = true;
        else eh_mobile = false;

        //CRIA O LINK PARA LOGIN MOBILE, SEM ELE O LOGIN É DESKTOP
        if(eh_mobile == true) param_touch = '/&display=touch&state=';

	document.location = url_base_fb_login + app_id + param_redirect + url_redirect + param_touch;
}

/**
 * Desloga o usuário do App e também do facebook
 * @returns {null}
 */
function deslogar_app(){
	FB.logout(function(response) {
		console.log(response);
	});
}

/**
 * Pega a sessao de usuário atual (/me)
 * @returns {null}
 */
function usuario_corrente(){
	FB.api('/me', function(response) {
            console.log(response);
	});	
}