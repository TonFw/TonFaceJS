function assinar_app(){
	url_base_fb_login = 'http://www.facebook.com/dialog/oauth?client_id=';
	app_id = 229992460513152;
	param_redirect = '&redirect_uri=http://';
	val_redirect = 'tonjs.herokuapp.com/';
	param_touch = '/&display=touch&state=';

	document.location = url_base_fb_login + app_id + param_redirect + val_redirect + param_touch;
}

function setUpFB(){
	window.fbAsyncInit = function() {
	    FB.init({
	        appId      : '229992460513152',
	        status     : true,
	        xfbml      : true
	    });

		FB.Event.subscribe('auth.authResponseChange', function(response) {
			if (response.status === 'connected') {
				console.log('Logged in on FB');
				$('#acoes_fb').hide();
				$('#resultado_fb').show();
			}else FB.login();
		});
	};

	(function(d){
	    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	    js = d.createElement('script'); js.id = id; js.async = true;
	    js.src = "//connect.facebook.net/es_LA/all.js";
	    d.getElementsByTagName('head')[0].appendChild(js);
	}(document));
}