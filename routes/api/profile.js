const express = require('express');
const router = express.Router();
//for protected routes
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route GET api/profile/me
//@description Get current user profile
//@access Private
router.get('/me', auth, async (req, res) => {
    try{
        /*populate is to fetch things that are not in the user model 
        but want it there eg the name, avatar*/
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
            'name', 'avatar'
        ]);
        if(!profile) {
            return res.status(400).json({ msg: "There is no profile for this uaer" });
        }
        res.json(profile);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;