export default /*@ngInject*/ function($auth, $http) {

	this.getOrgs = () => $http.get('/api/v1/organisation').then(res => this.organisations = res.data)

  this.startNew = () => {
    this.selected = {}
    this.edit = true
    this.new = true
  }

  this.create = () => $http.post('/api/v1/organisation', this.selected).then(res => {
    this.organisations.push(res.data)
    this.selected = {}
    this.new = false
    this.edit = false
  })

  this.getOrgs();

}
