module.exports = {
	// basic
	"env":  process.env.NODE_ENV || 'development',
	"port": process.env.PORT || 3000,

	// Database
	"db": {
		"db": process.env.DB || 'test',
		"port": process.env.DBPORT || 28015,
		"host": process.env.DBHOST || 'localhost',
	},
	
	// JWT
	"secret": process.env.JWT_SECRET || 'testsecret',

	// Mandrill
	"mandrill": { user: process.env.M_USER || "paul@agency.sc", pass: process.env.M_PASS || "rRlpl_m_BCd4AzirxzVl0Q" },

	// From email in all emails and also replaces the 'to:' email field in development env
	"email": process.env.EMAIL || 'paul@paulday.com.au',

	// Root admin
	"admin": process.env.ADMIN || 'paul@paulday.com.au'
};