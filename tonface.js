/**
 * Esta variável deve ser preenchida com a função a ser executada depois que o setUp do FB seja concluído
 * Obs: if (response.status === 'connected') significa que a permissão foi dada pelo usuário corrente
 * @type function com @param response
 */
var func_executada_onSetUp;

// Tranforma de localStorage p/ JSON Obj: usuario = JSON.parse(localStorage.usuario);

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
 * @param {string} escopo Quais acessos do FB o App vai necessitar (são separados por ,)
 * @returns {null}
 */
function signup_app(app_id, escopo, url_redirect){
	base_url_fb_login = 'http://www.facebook.com/dialog/oauth?client_id=';
    param_redirect = '&redirect_uri=http://';
    
    //O escopo é manipulado para que as virgulas sofram scape que é como a URL de Auth do FB funciona
    param_scope = '&scope=' + escape(escopo.replace(/ /g,''));
    param_touch = '';

    // Os parametros foram o tamanho da tela do iPad
    if( screen.height <= 770 && screen.width <= 1024 ) is_mobile = true;
    else is_mobile = false;

    //CRIA O LINK PARA LOGIN MOBILE, SEM ELE O LOGIN É DESKTOP
    if(is_mobile == true) param_touch = '/&display=touch&state=';

	document.location = base_url_fb_login + app_id + param_redirect + url_redirect + param_scope + param_touch;
}

/**
 * Desloga o usuário do App e também do facebook
 * @returns {null}
 */
function signout_app(){
	FB.logout(function(response) {
		console.log(response);
	});
}

/**
 * Pega a sessao de usuário atual (/me)
 * @returns {null}
 */
function get_usuario_corrente(){
	FB.api('/me', function(response) {
		console.log('Dados do Usuário:');
        console.log(response);
        localStorage.setItem("usuario", JSON.stringify(response));
        usuario = response; //JSON.parse(localStorage.usuario);
	});	
}

/* Pega as páginas do Usuário */
function get_paginas() {
    FB.api('/me/accounts', function(response) {
		console.log('Páginas do Usuário:');
        console.log(response);
        localStorage.setItem("paginas", JSON.stringify(response));
        paginas = response; //JSON.parse(localStorage.paginas);
	});
}

/**
 * Posta mensagem no mural do usuário
 * @param {String} mensagem => Mensagem a ir no post
 * @param {String} link => Link de referencia ao clicar no post
 * @returns {void}
 */
function set_msg_mural(mensagem, link) {
	// Everyone é para forçar que vá para o mural como sendo público (sem privacidade do usuário)
	FB.api('/me/feed', 'post', { message: mensagem, link: link, privacy: { value: 'EVERYONE' } }, function(response) {
		if (!response || response.error) { console.log(response); return; }
		
		localStorage.setItem("postagem", JSON.stringify(response));
		postagem = response;

		// Verifica se a publicação foi feita publicamente de forma que o App consiga ver
		FB.api(
			{
				// Configuração da FQL
				method: 'fql.query',
				query: 'SELECT like_info from stream WHERE post_id="' + postagem.id + '"',
				return_ssl_resources: 1
			},

			function(response){
				if(response.length <= 0) { postagem.erro = 'post_not_public'; return; }
				postagem_monitor = response;
			}
		);

	});
}