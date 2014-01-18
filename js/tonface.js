function assinar_app(){
	url_base_fb_login = 'http://www.facebook.com/dialog/oauth?client_id=';
	app_id = 229992460513152;
	param_redirect = '&redirect_uri=http://';
	val_redirect = 'tonface.herokuapp.com/';
	param_touch = '/&display=touch&state=';

	document.location = url_base_fb_login + app_id + param_redirect + val_redirect + param_touch;
}