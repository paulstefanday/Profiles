var email = require(__base+'/api/email');

module.exports = {

  passwordNew: function* (user) {
    var data = {
      to: user.email,
      subject: 'Welcome to Advocacy Tracker',
      template: 'passwordNew',

      // Extra vars
      user: user
    };

    return yield send(data);   
  },

  passwordReset: function* (user, password) {
    var data = {
        to:           user.email,
        subject:      'Password reset',
        password:      password,
        user:          user, 
        template:     'passwordReset'
    };

    return yield send(data);  
  }

}