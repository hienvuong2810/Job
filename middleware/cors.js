module.exports = cors = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'));
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, x-auth-token, Origin');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
}
