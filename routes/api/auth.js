const express = require('express');
const router = express.Router();
//for protected routes
const auth = require('../../middleware/auth');

const User = require('../../models/User');


//@route GET api/auth
//@description test route
//@access public
router.get('/', auth, async (req, res) => {
    //get user data
    try{
        //.select('-password') stops the password from being returned
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;