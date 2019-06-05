const auth = require('../middleware/auth')
const config = require('config');
const jwt = require('jsonwebtoken');
const {User,validate} = require('../models/users') ; //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')




router.get('/me', auth,  async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {


    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).send('This email has already in use by another user!');
    }

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save();

    const token = user.generateAuthToken();
    // set token into header, instead of body!
    res.header('x-auth-token', token).send(user);

});

module.exports = router;
