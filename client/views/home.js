export default /*@ngInject*/ function($auth, $state) {

	this.authenticate = function(provider) {
    $auth.authenticate(provider).then(res => $state.go('admin.dashboard'));
  };

  this.isUser = () => $auth.isAuthenticated()

}
