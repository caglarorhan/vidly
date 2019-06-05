const Joi = require('joi');
const {User} = require('../models/users') ; //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _= require('lodash');
//
// router.get('/', async (req, res) => {
//     const user = await User.find().sort('name');
//     res.send(user);
// });

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});

    if(!user) return res.status(400).send('Invalid email or password!');


try{
    await bcrypt.compare(req.body.password, user.password)
    const token = user.generateAuthToken();
    res.send(token);
}
catch(err){
    return res.status(400).send('Invalid email or password!',err);
    }


    // must set while node starts, this jwtPrivateKey will be added to environment
    // set vidyl_jwtPrivateKey=mySecureKey
});





function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
