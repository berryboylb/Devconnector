const express = require('express');
const router = express.Router();


//@route GET api/posts
//@description test route
//@access public
router.get('/', (req, res) => res.send('post route'));

module.exports = router;