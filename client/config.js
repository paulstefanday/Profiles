export default /*@ngInject*/ function($stateProvider, $urlRouterProvider, $authProvider) {

  $urlRouterProvider.otherwise("/");

  $authProvider.loginUrl = '/api/v1/login';
  $authProvider.signupUrl = '/api/v1/signup';
  $authProvider.loginRoute = '/';
  $authProvider.signupRoute = '/';
  $authProvider.tokenPrefix = 'profileApp';
  $authProvider.authHeader = 'Authorization';
  $authProvider.authToken = '';

  // Facebook
  $authProvider.facebook({
    clientId: process.env.ENV === 'production' ? "535096706647433" : "535124743311296",
    url: '/api/v1/facebook',
    authorizationEndpoint: 'https://www.facebook.com/v2.4/dialog/oauth',
    scope: ["public_profile", "email", "user_birthday"],
    type: '2.4'
  });

  $stateProvider
    .state('home', {
      url: "/",
      controllerAs: 'vm',
      controller: require('./views/home.js'),
      template: require('./views/home.jade')
    })
    .state('admin', {
      abstract: true,
      template: "<ui-view></ui-view>",
      resolve: {
        auth: /*@ngInject*/ ($auth, $q, $state) => {
          let q = $q.defer();
          if($auth.isAuthenticated()) q.resolve({});
          else {
            $state.go('home');
            q.reject({});
          }
          return q.promise;
        }
      }
    })
    .state('admin.dashboard', {
      url: "/dashboard",
      controllerAs: 'vm',
      controller: require('./views/dashboard.js'),
      template: require('./views/dashboard.jade')
    })
    .state('admin.organisation', {
      url: "/organisation",
      controllerAs: 'vm',
      controller: require('./views/organisation.js'),
      template: require('./views/organisation.jade')
    })
}

