class Nav {

  constructor() {
    this.restrict = 'E';
    this.controllerAs = 'vm';
    this.bindToController = true;
    this.template = require('./nav.jade');
    this.scope = {};
    this.controller = /*@ngInject*/ function($auth, $state){

      this.showNav = false;

      this.hide = () => this.showNav = false

      this.login = () => {
        $auth.authenticate('facebook').then(res => {
          this.hide();
          $state.go('admin.dashboard');
        });
      }

      this.logout = () => {
        $auth.logout().then(res => {
          this.hide();
          $state.go('home');
        });
      }

      this.loggedIn = () => $auth.isAuthenticated()

    }
  }
}

export default [ 'nav', Nav ]
