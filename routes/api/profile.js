const express = require('express');
const router = express.Router();
//for protected routes
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
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


//@route GET api/profile
//@description create or update a user profile
//@access Private
router.post('/',[auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async(req, res) => {
    //get valiadtion result
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors
        return res.status(400).json({ errors: errors.array()});
    }

    //pull the fields out
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedIn
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    
    //build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedIn) profileFields.social.linkedIn = linkedIn;
    if(instagram) profileFields.social.instagram = instagram;
    
    try{
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile){
            //update profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id}, 
                { $set: profileFields }, 
                { new: true }
            );

            return res.json(profile);
        }

        //create it
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;