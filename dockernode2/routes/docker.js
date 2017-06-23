const router = require('express').Router();

router.get('/', (req, res, next) => {
	return req.json({
		docker: 'rocks!'
	});
});

module.exports = router;