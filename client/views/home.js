export default /*@ngInject*/ function($auth) {

	this.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

  this.isUser = () => $auth.isAuthenticated()

}
