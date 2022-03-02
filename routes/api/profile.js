const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
//for protected routes
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { response } = require('express');


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


//@route POST api/profile
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


//@route GET api/profile
//@description get all profiles
//@access public
router.get('/', async (req, res) => {
    try{
        //fetch all profiles from the db and add name and avatar from users collection
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/profile/user/:user_id
//@description get profile by user_id
//@access public
router.get('/user/:user_id', async (req, res) => {
    try{
        //fetch all profiles from the db and add name and avatar from users collection
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: "Profile not found" });

        res.json(profile);
    }
    catch(err) {
        console.log(err.message);
        if(err.kind == 'ObjectId') return res.status(400).json({ msg: "Profile not found" });
        res.status(500).send('Server Error');
    }
});


//@route    DELETE api/profile
//@description DELETE profile, user and post if there is any
//@access private
router.delete('/', auth, async (req, res) => {
    try{
        //@todo - remove users posts
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User Deleted" });
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//@route    PUT api/profile/experience
//@description add profile experience
//@access private
router.put('/experience', [auth, 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty(),
    ]
], async (req, res) => {
    //get valiadtion result
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors
        return res.status(400).json({ errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to, 
        current,
        description
    } = req.body;

    //build our experience object
    const newExperience = {
        title,
        company,
        location,
        from,
        to, 
        current,
        description
    }

    //submit to mongodb
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExperience);  
        await profile.save();
        res.json(profile);
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//@route    Delete api/profile/experience/:exp_id
//@description  delete profile experience
//@access private
router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//@route    Put api/profile/experience/:exp_id
//@description  edit profile experience
//@access private
router.put("/experience/:exp_id", auth, async (req, res) => {
    const {
        title,
        company,
        location,
        from,
        to, 
        current,
        description
    } = req.body;
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //get index of the array to be edited
        const editIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        if(profile) {
            profile.experience[editIndex];
            if(title) profile.experience[editIndex].title = title;
            if(company) profile.experience[editIndex].company = company;
            if(location) profile.experience[editIndex].location = location;
            if(from) profile.experience[editIndex].from = from;
            if(to) profile.experience[editIndex].to = to;
            if(current) profile.experience[editIndex].current = current;
            if(description) profile.experience[editIndex].description = description;
            await profile.save();
            res.json(profile);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//@route    PUT api/profile/education
//@description add profile education
//@access private
router.put('/education', [auth, 
    [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty(),
    ]
], async (req, res) => {
    //get valiadtion result
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors
        return res.status(400).json({ errors: errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to, 
        current,
        description
    } = req.body;

    //build our education object
    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to, 
        current,
        description
    }

    //submit to mongodb
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEducation);  
        await profile.save();
        res.json(profile);
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//@route    Delete api/profile/education/:edu_id
//@description  delete profile education
//@access private
router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    Put api/profile/education/:edu_id
//@description  edit profile experience
//@access private
router.put("/education/:edu_id", auth, async (req, res) => {
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to, 
        current,
        description
    } = req.body;
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //get index of the array to be edited
        const editIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        if(profile) {
            profile.education[editIndex];
            if(school) profile.education[editIndex].school = school;
            if(degree) profile.education[editIndex].degree = degree;
            if(fieldofstudy) profile.education[editIndex].fieldofstudy = fieldofstudy;
            if(from) profile.education[editIndex].from = from;
            if(to) profile.education[editIndex].to = to;
            if(current) profile.education[editIndex].current = current;
            if(description) profile.education[editIndex].description = description;
            await profile.save();
            res.json(profile);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});




//@route    GET api/profile/github:username
//@description  get github projects 
//@access public
router.get("/github/:username", async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'} 
        }

        request(options, (error, response, body) => {
            if(error) console.log(error);

            if(response.statusCode !== 200){
                return res.status(404).json({ msg: "No Profile found" });
            }

            res.json(JSON.parse(body));
        });
        
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;