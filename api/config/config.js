module.exports = {
	// basic
	"env":  process.env.NODE_ENV || 'development',
	"port": process.env.PORT || 3000,

	// Database
	"db": {
		"db": process.env.DB || 'profilestest',
		"port": process.env.DBPORT || 28015,
		"host": process.env.DBHOST ||  '52.64.143.79', //'localhost',
	},

	// JWT
	"secret": process.env.JWT_SECRET || 'testsecret',

	// Mandrill
	"mandrill": { user: process.env.M_USER || "paul@agency.sc", pass: process.env.M_PASS || "rRlpl_m_BCd4AzirxzVl0Q" },

	// From email in all emails and also replaces the 'to:' email field in development env
	"email": process.env.EMAIL || 'paul@paulday.com.au',

	// Root admin
	"admin": process.env.ADMIN || 'paul@paulday.com.au',

	"facebook":  {
	   "key": process.env.NODE_ENV ? "535096706647433" : "535124743311296",
	   "secret": process.env.NODE_ENV ? "3b1c59ff4236ec10851ac6791432b541" : "ebe1bd018199eb66dadfc19377f6bb30",
	}
};
