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
        $auth.authenticate('facebook');
        this.hide();
      }

      this.logout = () => {
        $auth.logout();
        this.hide();
      }

      this.loggedIn = () => $auth.isAuthenticated()

    }
  }
}

export default [ 'nav', Nav ]
