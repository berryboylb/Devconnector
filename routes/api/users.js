const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//import the User model from models folder
const User = require('../../models/User');

//@route POST api/users
//@description register route
//@access public
router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
    ], 

    async (req, res) => {
    //get valiadtion result
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors
        return res.status(400).json({ errors: errors.array()});
    }

    //get name, email, password from req.body
    const { name, email, password } = req.body;

    try{
        //see if the user already exists
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        //setup gravatar
        //s is size, r is rating, d is default
        const avatar = gravatar.url({
            s: "200",
            r: "pg",
            d: "mm"
        });

        //create new user instance
        user = new User({
            name,
            email,
            avatar,
            password
        });

        //Encrypt password with bcrypt
        //create a salt
        const salt = await bcrypt.genSalt(10);
        //encrypt the password
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        //Return jsonwebtoken

        //create a pyload first
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
        //res.send('User has been registered');
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }    
});

module.exports = router;