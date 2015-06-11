module.exports = {
	// basic
	"env":  process.env.NODE_ENV || 'development',
	"port": process.env.PORT || 4000,

	// Database
	"db": {
		"name": process.env.DB || 'test'
	},
	
	// JWT
	"secret": process.env.JWT_SECRET || 'testsecret',

	// Mandrill
	"mandrill": { user: process.env.M_USER || "paul@agency.sc", pass: process.env.M_PASS || "rRlpl_m_BCd4AzirxzVl0Q" },

	// From email in all emails and also replaces the 'to:' email field in development env
	"email": process.env.EMAIL || 'paul@agency.sc',

	// Root admin
	"admin": process.env.ADMIN || 'paul@agency.sc'
};