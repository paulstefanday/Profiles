export default /*@ngInject*/ function($auth, $http) {

	this.getOrgs = () => {
    $http.get('/api/v1/organisation/').then(res => this.organisations = res.data)
  }

  this.getProfiles = () => {
    $http.get(`/api/v1/organisation/${this.organisation}/profiles`).then(res => console.log(res))
  }


  this.getOrgs();

}
